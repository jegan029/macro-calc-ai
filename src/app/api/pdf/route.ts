import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer'
import { MacroReportPdf } from '@/pdf/MacroReportPdf'
import { createElement, type ReactElement, type JSXElementConstructor } from 'react'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const calories = Number(searchParams.get('calories') ?? 2000)
  const protein = Number(searchParams.get('protein') ?? 150)
  const carbs = Number(searchParams.get('carbs') ?? 200)
  const fat = Number(searchParams.get('fat') ?? 67)
  const fiber = Number(searchParams.get('fiber') ?? 28)
  const goal = searchParams.get('goal') ?? 'MAINTENANCE'
  const firstName = searchParams.get('name') ?? undefined

  const pdfElement = createElement(MacroReportPdf, { calories, protein, carbs, fat, fiber, goal, firstName }) as ReactElement<DocumentProps, string | JSXElementConstructor<unknown>>
  const buffer = await renderToBuffer(pdfElement)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="macros-report.pdf"`,
      'Cache-Control': 'no-store',
    },
  })
}
