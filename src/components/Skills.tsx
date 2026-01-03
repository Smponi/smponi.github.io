import { motion } from 'framer-motion'
import { GlassCard } from './ui/GlassCard'

interface Skill {
  name: string
  icon: React.ReactNode
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  color: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Mobile Development',
    icon: <MobileIcon />,
    color: 'from-green-500 to-emerald-600',
    skills: [
      { name: 'Android', icon: <AndroidIcon /> },
      { name: 'Kotlin', icon: <KotlinIcon /> },
      { name: 'Jetpack Compose', icon: <ComposeIcon /> },
      { name: 'iOS', icon: <AppleIcon /> },
      { name: 'macOS', icon: <AppleIcon /> },
      { name: 'Swift', icon: <SwiftIcon /> },
      { name: 'SwiftUI', icon: <SwiftUIIcon /> },
    ],
  },
  {
    title: 'Backend & Tools',
    icon: <ServerIcon />,
    color: 'from-primary-500 to-primary-600',
    skills: [
      { name: 'Java', icon: <JavaIcon /> },
      { name: 'Kotlin', icon: <KotlinIcon /> },
      { name: 'Python', icon: <PythonIcon /> },
      { name: 'Git', icon: <GitIcon /> },
      { name: 'jj', icon: <GitIcon /> },
      { name: 'REST APIs', icon: <ApiIcon /> },
      { name: 'SQL', icon: <DatabaseIcon /> },
      { name: 'Graph QL', icon: <ApiIcon /> },
    ],
  },
  {
    title: 'Frontend & Design',
    icon: <PaletteIcon />,
    color: 'from-accent-500 to-purple-600',
    skills: [
      { name: 'React', icon: <ReactIcon /> },
      { name: 'TypeScript', icon: <TypeScriptIcon /> },
      { name: 'Tailwind CSS', icon: <TailwindIcon /> },
      { name: 'Figma', icon: <FigmaIcon /> },
      { name: 'HTML/CSS', icon: <HtmlIcon /> },
      { name: 'UI/UX', icon: <UiUxIcon /> },
    ],
  },
]

export function Skills() {
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

  return (
    <section id="skills" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm font-medium mb-4">
              Skills
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Meine Fähigkeiten
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Von Mobile Development bis Design - hier sind die Technologien, mit denen ich arbeite.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <GlassCard className="h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                      >
                        <span className="w-4 h-4">{skill.icon}</span>
                        {skill.name}
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Generic Icons (no trademarked brand logos)
function MobileIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  )
}

function ServerIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  )
}

function PaletteIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  )
}

// Generic smartphone icon for Android
function AndroidIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  )
}

// Generic code icon for programming languages
function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  )
}

// Reuse CodeIcon for Kotlin
function KotlinIcon() {
  return <CodeIcon />
}

// Generic layers icon for Compose
function ComposeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  )
}

// Generic desktop/laptop icon for iOS/macOS
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  )
}

// Generic code icon for Swift
function SwiftIcon() {
  return <CodeIcon />
}

// Generic component icon for SwiftUI
function SwiftUIIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}

// Generic code icon for Java
function JavaIcon() {
  return <CodeIcon />
}

// Generic code icon for Python
function PythonIcon() {
  return <CodeIcon />
}

// Generic branch icon for Git/Version Control
function GitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="6" y1="3" x2="6" y2="15"/>
      <circle cx="18" cy="6" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <path d="M18 9a9 9 0 0 1-9 9"/>
    </svg>
  )
}

// Generic API/Terminal icon
function ApiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

// Generic database icon
function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  )
}

// Generic component/module icon for React
function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="3"/>
      <ellipse cx="12" cy="12" rx="10" ry="4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
    </svg>
  )
}

// Generic typed code icon for TypeScript
function TypeScriptIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M8 11h4m-2 0v6"/>
      <path d="M14 11h2a2 2 0 110 4h-2v2"/>
    </svg>
  )
}

// Generic style/CSS icon for Tailwind
function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 6c-2 0-3.2.8-4 2.4 1.6-1.2 3.2-1.4 4.8-.6.9.5 1.6 1.2 2.4 2 1.3 1.3 2.8 2.2 5.2 2.2 2 0 3.2-.8 4-2.4-1.6 1.2-3.2 1.4-4.8.6-.9-.5-1.6-1.2-2.4-2C15.9 6.9 14.4 6 12 6z"/>
      <path d="M6 12c-2 0-3.2.8-4 2.4 1.6-1.2 3.2-1.4 4.8-.6.9.5 1.6 1.2 2.4 2 1.3 1.3 2.8 2.2 5.2 2.2 2 0 3.2-.8 4-2.4-1.6 1.2-3.2 1.4-4.8.6-.9-.5-1.6-1.2-2.4-2-1.3-1.3-2.8-2.2-5.2-2.2z"/>
    </svg>
  )
}

// Generic design/pen tool icon for Figma
function FigmaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 2H8.5A3.5 3.5 0 005 5.5v0A3.5 3.5 0 008.5 9H12V2z"/>
      <path d="M12 9H8.5A3.5 3.5 0 005 12.5v0A3.5 3.5 0 008.5 16H12V9z"/>
      <path d="M12 16H8.5A3.5 3.5 0 005 19.5v0A3.5 3.5 0 008.5 23H12v-7z"/>
      <circle cx="16" cy="12.5" r="3.5"/>
    </svg>
  )
}

// Generic web/globe icon for HTML
function HtmlIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

// Generic design icon for UI/UX
function UiUxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  )
}
