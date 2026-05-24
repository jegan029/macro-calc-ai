'use client'

import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'

export function ConfettiEffect() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [running, setRunning] = useState(true)

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
    const timer = setTimeout(() => setRunning(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!running || dimensions.width === 0) return null

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={false}
      numberOfPieces={300}
      colors={['#00FF87', '#00CC6A', '#ffffff', '#a3e635', '#4ade80']}
      gravity={0.15}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}
    />
  )
}
