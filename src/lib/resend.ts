import { Resend } from 'resend'
import type { MacroResult } from '@/types'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}
export const resend = new Proxy({} as Resend, {
  get(_target, prop) { return getResend()[prop as keyof Resend] },
})

export async function addToAudience(email: string, name?: string) {
  try {
    await resend.contacts.create({
      email,
      firstName: name,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    })
  } catch {
    // Non-fatal — don't block the user flow
  }
}

export async function sendMacroReportEmail(
  email: string,
  name: string,
  macros: MacroResult,
  goal: string,
  pdfUrl?: string
) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'hello@macrocalc.ai',
    to: email,
    subject: `Your MacroCalc AI Report is Ready, ${name}!`,
    html: buildMacroReportHtml(name, macros, goal, pdfUrl),
  })
}

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'hello@macrocalc.ai',
    to: email,
    subject: `Welcome to MacroCalc AI, ${name}!`,
    html: buildWelcomeHtml(name),
  })
}

function buildMacroReportHtml(
  name: string,
  macros: MacroResult,
  goal: string,
  pdfUrl?: string
): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="background:#0a0a0a;color:#fff;font-family:sans-serif;padding:40px 20px;max-width:600px;margin:0 auto;">
  <div style="text-align:center;margin-bottom:32px;">
    <h1 style="color:#00FF87;font-size:28px;margin:0;">MacroCalc AI</h1>
    <p style="color:#666;margin:8px 0 0;">Your Personal Macro Report</p>
  </div>
  <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h2 style="color:#fff;margin:0 0 16px;">Hi ${name}! Here are your daily macros:</h2>
    <p style="color:#888;margin:0 0 16px;">Goal: <strong style="color:#00FF87;">${goal}</strong></p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div style="background:rgba(0,255,135,0.1);border:1px solid rgba(0,255,135,0.3);border-radius:8px;padding:16px;text-align:center;">
        <div style="font-size:32px;font-weight:700;color:#00FF87;">${macros.calories}</div>
        <div style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Calories</div>
      </div>
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:16px;text-align:center;">
        <div style="font-size:32px;font-weight:700;color:#fff;">${macros.protein}g</div>
        <div style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Protein</div>
      </div>
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:16px;text-align:center;">
        <div style="font-size:32px;font-weight:700;color:#fff;">${macros.carbs}g</div>
        <div style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Carbs</div>
      </div>
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:16px;text-align:center;">
        <div style="font-size:32px;font-weight:700;color:#fff;">${macros.fat}g</div>
        <div style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Fat</div>
      </div>
    </div>
  </div>
  ${pdfUrl ? `<div style="text-align:center;margin-bottom:24px;"><a href="${pdfUrl}" style="background:#00FF87;color:#000;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Download PDF Report</a></div>` : ''}
  <p style="color:#666;text-align:center;font-size:12px;">MacroCalc AI · Calculate. Plan. Transform.</p>
</body>
</html>`
}

function buildWelcomeHtml(name: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="background:#0a0a0a;color:#fff;font-family:sans-serif;padding:40px 20px;max-width:600px;margin:0 auto;">
  <h1 style="color:#00FF87;">Welcome to MacroCalc AI, ${name}! 🎯</h1>
  <p>Your personalized macro journey starts now. Here's what you can do:</p>
  <ul style="color:#ccc;line-height:1.8;">
    <li>Calculate your perfect macros in 10 seconds</li>
    <li>Get AI-powered meal plans tailored to your goals</li>
    <li>Track your progress over time</li>
    <li>Share your results and challenge friends</li>
  </ul>
  <a href="${process.env.NEXT_PUBLIC_APP_URL}/calculator" style="background:#00FF87;color:#000;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;margin-top:16px;">Calculate My Macros</a>
</body>
</html>`
}
