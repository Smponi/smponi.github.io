import { motion } from 'framer-motion'

interface GradientOrbProps {
  className?: string
  color?: 'primary' | 'accent' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  delay?: number
}

const colorClasses = {
  primary: 'from-primary-400 to-primary-600',
  accent: 'from-accent-400 to-purple-600',
  purple: 'from-purple-400 to-pink-600',
}

const sizeClasses = {
  sm: 'w-64 h-64',
  md: 'w-96 h-96',
  lg: 'w-[500px] h-[500px]',
}

export function GradientOrb({
  className = '',
  color = 'primary',
  size = 'md',
  delay = 0
}: GradientOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br ${colorClasses[color]} ${sizeClasses[size]} blur-[80px] opacity-50 dark:opacity-30 pointer-events-none ${className}`}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -30, 20, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
