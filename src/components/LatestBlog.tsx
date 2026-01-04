import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getLatestPost } from '../lib/blog'
import { GlassCard } from './ui/GlassCard'

export function LatestBlog() {
  const latestPost = getLatestPost()

  if (!latestPost) {
    return null
  }

  const formattedDate = new Date(latestPost.date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

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
    <section id="blog" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium mb-4">
              Blog
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Neuester Beitrag
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Gedanken und Einblicke aus meiner Entwickler-Welt
            </p>
          </motion.div>

          {/* Featured Post Card */}
          <motion.div variants={itemVariants}>
            <Link to={`/blog/${latestPost.slug}`} className="block group">
              <GlassCard className="p-8 sm:p-10 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors">
                <div className="grid md:grid-cols-[1fr,auto] gap-6 items-center">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {latestPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {latestPost.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {latestPost.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                      <span>{formattedDate}</span>
                      <span>·</span>
                      <span>{latestPost.readingTime} min Lesezeit</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </motion.div>

          {/* View All Link */}
          <motion.div variants={itemVariants} className="text-center mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              <span>Alle Beitraege ansehen</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
