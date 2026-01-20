import { useSyncExternalStore } from 'react'

// Singleton for mobile detection - only calculated once
let isMobileCache: boolean | null = null

function getIsMobile(): boolean {
  if (isMobileCache === null) {
    isMobileCache =
      typeof window !== 'undefined' &&
      (window.matchMedia('(hover: none)').matches || 'ontouchstart' in window)
  }
  return isMobileCache
}

// For SSR compatibility
function getServerSnapshot(): boolean {
  return false
}

// Subscribe to changes (media query changes)
function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const mediaQuery = window.matchMedia('(hover: none)')
  const handleChange = () => {
    isMobileCache = null // Reset cache on change
    callback()
  }

  mediaQuery.addEventListener('change', handleChange)
  return () => mediaQuery.removeEventListener('change', handleChange)
}

/**
 * Shared hook for mobile/touch device detection.
 * Uses useSyncExternalStore to share state across all components,
 * avoiding redundant useEffect calls in each GlassCard.
 */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getIsMobile, getServerSnapshot)
}
