'use client'

import dynamic from 'next/dynamic'

const RadialBarChart = dynamic(() => import('recharts').then((m) => ({ default: m.RadialBarChart })), { ssr: false })
const RadialBar = dynamic(() => import('recharts').then((m) => ({ default: m.RadialBar })), { ssr: false })
const Legend = dynamic(() => import('recharts').then((m) => ({ default: m.Legend })), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then((m) => ({ default: m.ResponsiveContainer })), { ssr: false })

interface RadialChartProps {
  protein: number
  carbs: number
  fat: number
  calories: number
}

export function RadialChart({ protein, carbs, fat, calories }: RadialChartProps) {
  const total = protein * 4 + carbs * 4 + fat * 9

  const data = [
    {
      name: 'Protein',
      value: Math.round((protein * 4 / total) * 100),
      fill: '#00FF87',
    },
    {
      name: 'Carbs',
      value: Math.round((carbs * 4 / total) * 100),
      fill: '#3b82f6',
    },
    {
      name: 'Fat',
      value: Math.round((fat * 9 / total) * 100),
      fill: '#f97316',
    },
  ]

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={260}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="35%"
          outerRadius="80%"
          barSize={18}
          data={data}
          startAngle={180}
          endAngle={-180}
        >
          <RadialBar
            dataKey="value"
            cornerRadius={8}
            background={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      {/* Center calories */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-neon tabular-nums">{calories.toLocaleString()}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-widest">kcal/day</span>
      </div>
    </div>
  )
}
