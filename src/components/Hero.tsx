import { motion } from 'framer-motion'
import { GradientOrb } from './ui/GradientOrb'

export function Hero() {
  const roles = ['Mobile Developer', 'Android Engineer', 'iOS Developer', 'Software Engineer']

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Orbs */}
      <GradientOrb
        color="primary"
        size="lg"
        className="-top-40 -right-40"
        delay={0}
      />
      <GradientOrb
        color="accent"
        size="md"
        className="-bottom-20 -left-20"
        delay={2}
      />
      <GradientOrb
        color="purple"
        size="sm"
        className="top-1/3 left-1/4"
        delay={4}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary-600 dark:text-primary-400">
            Hey, ich bin
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="gradient-text">Philipp</span>
          <br />
          <span className="text-slate-800 dark:text-white">Smponias</span>
        </motion.h1>

        {/* Animated Role */}
        <motion.div
          className="h-12 mb-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <RoleCarousel roles={roles} />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          B.Sc. Softwaretechnik an der Universität Stuttgart.
          Leidenschaftlich für eleganten Code und innovative Mobile Apps.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.a
            href="#projects"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold glow hover:shadow-xl hover:shadow-primary-500/30 transition-shadow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Meine Projekte
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 rounded-xl glass font-semibold text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Kontakt
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* Floating Icons */}
      <FloatingIcons />
    </section>
  )
}

function RoleCarousel({ roles }: { roles: string[] }) {
  return (
    <div className="relative h-10 overflow-hidden">
      <motion.div
        animate={{
          y: roles.map((_, i) => -i * 40),
        }}
        transition={{
          y: {
            duration: roles.length * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            times: roles.map((_, i) => i / roles.length),
          }
        }}
        className="flex flex-col"
      >
        {[...roles, roles[0]].map((role, i) => (
          <span
            key={i}
            className="h-10 flex items-center justify-center text-2xl sm:text-3xl font-semibold text-primary-600 dark:text-primary-400"
          >
            {role}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function FloatingIcons() {
  const icons = [
    { icon: AndroidIcon, className: 'top-1/4 right-[10%]', delay: 0 },
    { icon: AppleIcon, className: 'top-1/3 left-[8%]', delay: 1 },
    { icon: CodeIcon, className: 'bottom-1/4 right-[15%]', delay: 2 },
    { icon: KotlinIcon, className: 'bottom-1/3 left-[12%]', delay: 1.5 },
  ]

  return (
    <>
      {icons.map(({ icon: Icon, className, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden lg:block ${className}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.6,
            scale: 1,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { delay: 0.8 + delay * 0.2 },
            scale: { delay: 0.8 + delay * 0.2 },
            y: { duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay: delay }
          }}
        >
          <div className="p-4 rounded-2xl glass">
            <Icon className="w-8 h-8 text-slate-600 dark:text-slate-400" />
          </div>
        </motion.div>
      ))}
    </>
  )
}

// Generic Icons (no trademarked brand logos)
function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  )
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  )
}

function KotlinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  )
}
