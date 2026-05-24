'use client'

import dynamic from 'next/dynamic'
import { GlassCard } from '@/components/shared/GlassCard'
import { TrendingDown } from 'lucide-react'

const LineChart = dynamic(() => import('recharts').then((m) => ({ default: m.LineChart })), { ssr: false })
const Line = dynamic(() => import('recharts').then((m) => ({ default: m.Line })), { ssr: false })
const XAxis = dynamic(() => import('recharts').then((m) => ({ default: m.XAxis })), { ssr: false })
const YAxis = dynamic(() => import('recharts').then((m) => ({ default: m.YAxis })), { ssr: false })
const CartesianGrid = dynamic(() => import('recharts').then((m) => ({ default: m.CartesianGrid })), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then((m) => ({ default: m.Tooltip })), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then((m) => ({ default: m.ResponsiveContainer })), { ssr: false })

interface WeightEntry {
  weightKg: number
  loggedAt: Date | string
}

interface WeightTrendChartProps {
  data: WeightEntry[]
}

export function WeightTrendChart({ data }: WeightTrendChartProps) {
  const chartData = data.map((entry) => ({
    date: new Date(entry.loggedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: entry.weightKg,
  }))

  if (chartData.length === 0) {
    return (
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="size-4 text-neon" />
          <h3 className="font-semibold">Weight Trend</h3>
        </div>
        <div className="h-48 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Log your weight to see your trend</p>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-4">
        <TrendingDown className="size-4 text-neon" />
        <h3 className="font-semibold">Weight Trend</h3>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#666' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={['dataMin - 2', 'dataMax + 2']}
            tick={{ fontSize: 11, fill: '#666' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#111',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            labelStyle={{ color: '#fff' }}
            formatter={(v) => [`${v} kg`, 'Weight']}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#00FF87"
            strokeWidth={2}
            dot={{ fill: '#00FF87', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  )
}
