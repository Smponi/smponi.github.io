import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GlassCard } from '../ui/GlassCard'
import type { BlogPost } from '../../types/blog'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <GlassCard
        className={`h-full hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors ${
          featured ? 'p-8' : 'p-6'
        }`}
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${
            featured ? 'text-2xl' : 'text-lg'
          }`}
        >
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-500">
          <span>{formattedDate}</span>
          <span>{post.readingTime} min Lesezeit</span>
        </div>

        {/* Read more indicator */}
        <motion.div
          className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        >
          <span>Weiterlesen</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </GlassCard>
    </Link>
  )
}
