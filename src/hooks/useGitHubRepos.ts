import { useState, useEffect } from 'react'
import { GitHubRepo } from '../types/github'

const GITHUB_USERNAME = 'Smponi'
const CACHE_KEY = 'github_repos_cache'
const CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

interface CacheData {
  repos: GitHubRepo[]
  timestamp: number
}

export function useGitHubRepos(limit: number = 6) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const cacheData: CacheData = JSON.parse(cached)
        if (Date.now() - cacheData.timestamp < CACHE_DURATION) {
          setRepos(cacheData.repos.slice(0, limit))
          setLoading(false)
          return
        }
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }

        const data: GitHubRepo[] = await response.json()

        // Filter out forks and sort by stars then by update date
        const filteredRepos = data
          .filter(repo => !repo.fork)
          .sort((a, b) => {
            // Sort by stars first, then by update date
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          })

        // Cache the results
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          repos: filteredRepos,
          timestamp: Date.now()
        }))

        setRepos(filteredRepos.slice(0, limit))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [limit])

  return { repos, loading, error }
}
