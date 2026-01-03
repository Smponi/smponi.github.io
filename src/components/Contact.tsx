import { motion } from 'framer-motion'
import { GlassCard } from './ui/GlassCard'
import { GradientOrb } from './ui/GradientOrb'

export function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const contactMethods = [
    {
      icon: <EmailIcon />,
      label: 'Email',
      value: 'philipp@smponias.de',
      href: 'mailto:philipp@smponias.de',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: <GitHubIcon />,
      label: 'GitHub',
      value: '@Smponi',
      href: 'https://github.com/Smponi',
      color: 'from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800',
    },
    {
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
      value: 'Philipp Smponias',
      href: 'https://www.linkedin.com/in/smponias-p',
      color: 'from-blue-500 to-blue-700',
    },
  ]

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Orbs */}
      <GradientOrb
        color="primary"
        size="md"
        className="-bottom-20 -right-20"
        delay={0}
      />
      <GradientOrb
        color="accent"
        size="sm"
        className="top-20 -left-10"
        delay={2}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Lass uns reden!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Hast du eine Idee, ein Projekt oder willst einfach nur Hallo sagen?
              Ich freue mich von dir zu hören!
            </p>
          </motion.div>

          {/* Main CTA */}
          <motion.div variants={itemVariants} className="mb-12">
            <GlassCard className="text-center py-12" tilt={false}>
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Open for Opportunities
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
                Ich bin offen für spannende Projekte und Zusammenarbeit.
                Let's build something great together!
              </p>
              <motion.a
                href="mailto:philipp@smponias.de"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold glow hover:shadow-xl hover:shadow-primary-500/30 transition-shadow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email schreiben
              </motion.a>
            </GlassCard>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid sm:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('mailto') ? undefined : '_blank'}
                rel={method.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <GlassCard className="text-center h-full hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                    {method.icon}
                  </div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-1">
                    {method.label}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {method.value}
                  </p>
                </GlassCard>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
