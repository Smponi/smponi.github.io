import { useRef, ReactNode, useCallback, useState, useEffect } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  tilt?: boolean
}

export function GlassCard({ children, className = '', tilt = true }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true)

  // Detect mobile/touch device
  useEffect(() => {
    setIsMobile(window.matchMedia('(hover: none)').matches || 'ontouchstart' in window)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || isMobile || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateX = (mouseY / (rect.height / 2)) * -4
    const rotateY = (mouseX / (rect.width / 2)) * 4

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }, [tilt, isMobile])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }, [])

  return (
    <div
      ref={cardRef}
      className={`glass rounded-2xl p-6 will-change-transform transition-transform duration-150 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
