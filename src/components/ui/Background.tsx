import { useEffect, useRef } from 'react'

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

      {/* Mesh gradient - static, GPU-friendly */}
      <div className="absolute inset-0 opacity-60 dark:opacity-40">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary-400/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-accent-400/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 left-1/3 w-1/2 h-1/2 bg-gradient-radial from-purple-400/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Animated gradient overlay - CSS animation, GPU-optimized */}
      <div className="absolute inset-0 bg-gradient-conic opacity-30 dark:opacity-20 animate-spin-slow" />

      {/* Noise texture for depth */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.03]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05]" />

      {/* Interactive glow that follows scroll */}
      <ScrollGlow />
    </div>
  )
}

function ScrollGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!glowRef.current) return
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const scrollPercent = Math.min(scrollY / maxScroll, 1)

      // Move glow based on scroll
      glowRef.current.style.transform = `translateY(${scrollPercent * 50}vh)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={glowRef}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none will-change-transform"
      style={{ transition: 'transform 0.1s ease-out' }}
    >
      <div className="w-full h-full bg-gradient-radial from-primary-500/20 via-accent-500/10 to-transparent rounded-full blur-3xl" />
    </div>
  )
}
