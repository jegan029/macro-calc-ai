import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const calories = searchParams.get('calories') ?? '2000'
  const protein = searchParams.get('protein') ?? '160'
  const carbs = searchParams.get('carbs') ?? '220'
  const fat = searchParams.get('fat') ?? '67'
  const goal = searchParams.get('goal') ?? 'Maintenance'
  const title = searchParams.get('title') ?? 'My Daily Macros'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(0,255,135,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              background: '#00FF87',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '700',
              color: '#000',
            }}
          >
            M
          </div>
          <span style={{ color: '#fff', fontSize: '22px', fontWeight: '700' }}>MacroCalc AI</span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: '#fff',
            fontSize: '36px',
            fontWeight: '700',
            margin: '0 0 8px',
            textAlign: 'center',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: '#666',
            fontSize: '18px',
            margin: '0 0 40px',
          }}
        >
          Goal: <span style={{ color: '#00FF87' }}>{goal}</span>
        </p>

        {/* Macro grid */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          {[
            { label: 'Calories', value: calories, unit: 'kcal', color: '#00FF87' },
            { label: 'Protein', value: protein, unit: 'g', color: '#3b82f6' },
            { label: 'Carbs', value: carbs, unit: 'g', color: '#8b5cf6' },
            { label: 'Fat', value: fat, unit: 'g', color: '#f97316' },
          ].map((macro) => (
            <div
              key={macro.label}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${macro.color}30`,
                borderRadius: '16px',
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '200px',
              }}
            >
              <div
                style={{
                  fontSize: '52px',
                  fontWeight: '800',
                  color: macro.color,
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {macro.value}
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>{macro.unit}</div>
              <div
                style={{
                  color: '#888',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '6px',
                }}
              >
                {macro.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p
          style={{
            position: 'absolute',
            bottom: '24px',
            color: '#444',
            fontSize: '14px',
          }}
        >
          macrocalc.ai · Calculate. Plan. Transform.
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
