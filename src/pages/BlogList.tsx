import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../lib/blog'
import { BlogCard } from '../components/blog/BlogCard'
import { Background } from '../components/ui/Background'

export function BlogList() {
  const posts = getAllPosts()

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
    <div className="min-h-screen">
      <Background />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="glass-strong rounded-2xl px-6 py-3 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Zurueck</span>
            </Link>
            <span className="text-xl font-bold gradient-text">Blog</span>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Page Title */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Blog
              </h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Gedanken, Tutorials und Einblicke aus der Welt der Mobile-Entwicklung
              </p>
            </motion.div>

            {/* Posts Grid */}
            {posts.length > 0 ? (
              <div className="grid gap-6">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BlogCard post={post} featured={index === 0} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="text-center py-20 text-slate-500 dark:text-slate-400"
              >
                <p>Noch keine Blog-Eintraege vorhanden.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
