'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  style?: CSSProperties
  decimals?: number
}

export function AnimatedNumber({
  value,
  duration = 1.2,
  suffix = '',
  prefix = '',
  className,
  style,
  decimals = 0,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
    })
    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplayValue(latest.toFixed(decimals))
    })
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [isInView, value, duration, decimals, motionValue])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}
