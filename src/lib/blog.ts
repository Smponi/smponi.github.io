import type { BlogPost } from '../types/blog'

// Vite glob import all markdown files at build time
const blogFiles = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Simple browser-compatible frontmatter parser
function parseFrontmatter(rawContent: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = rawContent.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content: rawContent }
  }

  const frontmatterStr = match[1]
  const content = match[2]
  const data: Record<string, unknown> = {}

  // Parse YAML-like frontmatter (simple key: value pairs)
  for (const line of frontmatterStr.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const colonIndex = trimmed.indexOf(':')
    if (colonIndex === -1) continue

    const key = trimmed.slice(0, colonIndex).trim()
    let value: unknown = trimmed.slice(colonIndex + 1).trim()

    // Remove quotes from strings
    if (typeof value === 'string') {
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      // Parse arrays like ["tag1", "tag2"]
      else if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value)
        } catch {
          // Keep as string if JSON parse fails
        }
      }
      // Parse booleans
      else if (value === 'true') value = true
      else if (value === 'false') value = false
    }

    data[key] = value
  }

  return { data, content }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function parsePost(filename: string, rawContent: string): BlogPost | null {
  const { data, content } = parseFrontmatter(rawContent)

  // Skip unpublished posts
  if (data.published === false) {
    return null
  }

  // Extract slug from filename
  const slug = filename
    .replace('/content/blog/', '')
    .replace('.md', '')

  return {
    slug,
    title: (data.title as string) || 'Untitled',
    date: (data.date as string) || new Date().toISOString().split('T')[0],
    tags: (data.tags as string[]) || [],
    description: (data.description as string) || '',
    published: data.published !== false,
    content,
    readingTime: calculateReadingTime(content),
  }
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = []

  for (const [filename, rawContent] of Object.entries(blogFiles)) {
    const post = parsePost(filename, rawContent as string)
    if (post) {
      posts.push(post)
    }
  }

  // Sort by date descending (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug)
}

export function getLatestPost(): BlogPost | undefined {
  const posts = getAllPosts()
  return posts[0]
}

export function getLatestPosts(count: number): BlogPost[] {
  return getAllPosts().slice(0, count)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tags.add(tag)
    }
  }
  return Array.from(tags).sort()
}
