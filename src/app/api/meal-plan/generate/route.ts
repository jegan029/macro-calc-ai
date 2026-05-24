import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { openai, buildMealPlanPrompt, buildGroceryPrompt } from '@/lib/openai'
import { prisma } from '@/lib/prisma'
import { checkRateLimit, mealPlanRateLimit } from '@/lib/ratelimit'
import { isPremium } from '@/lib/clerk'

const schema = z.object({
  macros: z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fat: z.number(),
    fiber: z.number(),
    weightKg: z.number(),
  }),
  cuisine: z.enum(['standard', 'mediterranean', 'asian', 'indian', 'mexican', 'vegetarian', 'vegan', 'keto']),
  restrictions: z.array(z.string()).default([]),
  generateGrocery: z.boolean().default(true),
})

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
  const identifier = userId ?? ip

  const { success } = await checkRateLimit(mealPlanRateLimit, identifier)
  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 })
  }

  const premium = userId ? await isPremium() : false
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { macros, cuisine, restrictions, generateGrocery } = parsed.data

  const prompt = buildMealPlanPrompt(macros, cuisine, restrictions as never, 7)

  try {
    const completion = await openai.chat.completions.create({
      model: premium ? 'gpt-4o' : 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional nutritionist and meal planning expert. Always return valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const planData = JSON.parse(completion.choices[0].message.content ?? '{}')

    let groceryData = null
    if (generateGrocery) {
      const groceryCompletion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a nutrition expert. Return a JSON array of grocery categories.',
          },
          { role: 'user', content: buildGroceryPrompt(macros, cuisine) },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.5,
      })
      const groceryRaw = JSON.parse(groceryCompletion.choices[0].message.content ?? '{}')
      groceryData = Array.isArray(groceryRaw) ? groceryRaw : (groceryRaw.categories ?? [])
    }

    // Track AI usage if logged in
    if (userId) {
      const user = await prisma.user.findUnique({ where: { clerkId: userId }, select: { id: true } })
      if (user) {
        await prisma.aiGeneration.create({
          data: {
            userId: user.id,
            type: 'meal_plan',
            promptTokens: completion.usage?.prompt_tokens ?? 0,
            completionTokens: completion.usage?.completion_tokens ?? 0,
            model: premium ? 'gpt-4o' : 'gpt-4o-mini',
          },
        }).catch(() => {})
      }
    }

    return NextResponse.json({ plan: planData, grocery: groceryData })
  } catch (err) {
    console.error('AI meal plan error:', err)
    return NextResponse.json({ error: 'Failed to generate meal plan' }, { status: 500 })
  }
}
