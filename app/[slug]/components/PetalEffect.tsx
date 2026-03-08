'use client'

import { useEffect, useRef } from 'react'

type Petal = {
  x: number
  y: number
  size: number
  speedY: number
  driftX: number
  rotation: number
  rotationSpeed: number
  life: number
  maxLife: number
}

// Subtle floating petals following pointer/touch
export default function PetalEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const petalsRef = useRef<Petal[]>([])
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const addPetal = (x: number, y: number) => {
      const size = 10 + Math.random() * 14
      petalsRef.current.push({
        x,
        y,
        size,
        speedY: 0.8 + Math.random() * 1.2,
        driftX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        life: 0,
        maxLife: 140 + Math.random() * 80,
      })
    }

    const spawn = (e: PointerEvent | TouchEvent) => {
      const points: Array<{ x: number; y: number }> = []
      if (e instanceof TouchEvent) {
        for (const t of Array.from(e.touches)) points.push({ x: t.clientX, y: t.clientY })
      } else if ('clientX' in e) {
        points.push({ x: e.clientX, y: e.clientY })
      }
      points.forEach((p) => {
        const count = 2 + Math.floor(Math.random() * 2)
        for (let i = 0; i < count; i++) addPetal(p.x + (Math.random() - 0.5) * 24, p.y)
      })
    }

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const petals = petalsRef.current
      for (let i = petals.length - 1; i >= 0; i--) {
        const petal = petals[i]
        petal.y += petal.speedY
        petal.x += petal.driftX
        petal.rotation += petal.rotationSpeed
        petal.life += 1

        const alpha = 1 - petal.life / petal.maxLife
        if (alpha <= 0) {
          petals.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.translate(petal.x, petal.y)
        ctx.rotate(petal.rotation)
        ctx.fillStyle = `rgba(255, 192, 203, ${alpha * 0.8})`
        ctx.beginPath()
        const s = petal.size
        ctx.moveTo(0, -s * 0.4)
        ctx.bezierCurveTo(s * 0.6, -s * 1.2, s * 1.2, s * 0.2, 0, s)
        ctx.bezierCurveTo(-s * 1.2, s * 0.2, -s * 0.6, -s * 1.2, 0, -s * 0.4)
        ctx.fill()
        ctx.restore()
      }
      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)

    window.addEventListener('pointermove', spawn)
    window.addEventListener('touchmove', spawn, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', spawn)
      window.removeEventListener('touchmove', spawn)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden
    />
  )
}
