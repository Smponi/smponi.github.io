import { motion } from 'framer-motion'
import { GlassCard } from './ui/GlassCard'

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
              About
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Über mich
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image/Avatar Side */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl blur-2xl opacity-30" />
                <GlassCard className="relative p-8 text-center" tilt={false}>
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-6xl font-bold text-white">
                    PS
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Philipp Smponias
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Software Engineer
                  </p>
                  <div className="flex justify-center gap-3">
                    <SocialLink
                      href="https://github.com/Smponi"
                      icon={<GitHubIcon />}
                      label="GitHub"
                    />
                    <SocialLink
                      href="https://www.linkedin.com/in/smponias-p"
                      icon={<LinkedInIcon />}
                      label="LinkedIn"
                    />
                    <SocialLink
                      href="mailto:philipp@smponias.de"
                      icon={<EmailIcon />}
                      label="Email"
                    />
                  </div>
                </GlassCard>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div variants={itemVariants}>
              <GlassCard tilt={false}>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Meine Story
                </h3>
                <div className="space-y-4 text-slate-600 dark:text-slate-400">
                  <p>
                    Hey! Ich bin Philipp, 27 Jahre alt. Meine Leidenschaft gilt der Software-Entwicklung, 
                    von der Konzeptionierung der Architektur bis hin zum Fertigstellen.
                    Mein Fokus liegt zur zeit verstärkt auf mobile Apps, professionell für Android. In meiner 
                    Freizeit aber auch gerne iOS und seit kurzem auch macOS.
                  </p>
                  <p>
                    Was mich antreibt? Der Moment, wenn eine App zum Leben erwacht und echte
                    Probleme löst. Ich liebe es, eleganten Code zu schreiben, der nicht nur
                    funktioniert, sondern auch wartbar und skalierbar ist. 
                    Sprich Code den man sich in 2 Monaten anschauen kann und versteht was gewollt war.
                  </p>
                  <p>
                    In meiner Freizeit experimentiere ich mit neuen Technologien, trage zu
                    Open-Source-Projekten bei und bin immer offen für spannende neue Ideen.
                  </p>
                </div>

                {/* Quick Facts */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="grid grid-cols-2 gap-4">
                    <QuickFact label="Studium" value="B.Sc. Softwaretechnik" />
                    <QuickFact label="Fokus" value="Mobile Development" />
                    <QuickFact label="Current project" value="Mouse Emulator for MacOS 26+" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-primary-900/50 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  )
}

function QuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-500">{label}</p>
      <p className="font-medium text-slate-900 dark:text-white">{value}</p>
    </div>
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

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
