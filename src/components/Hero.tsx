import { motion } from 'framer-motion'

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function Hero() {
  const roles = ['Mobile Developer', 'Android Engineer', 'iOS Developer', 'Software Engineer']

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
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
      </motion.div>
    </section>
  )
}

// CSS-based carousel for better performance
function RoleCarousel({ roles }: { roles: string[] }) {
  return (
    <div className="relative h-10 overflow-hidden">
      <div className="flex flex-col animate-role-carousel">
        {[...roles, roles[0]].map((role, i) => (
          <span
            key={i}
            className="h-10 flex items-center justify-center text-2xl sm:text-3xl font-semibold text-primary-600 dark:text-primary-400"
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  )
}
