import { useContext } from 'react'
import { SiteContentContext } from '../context/SiteContentContext'

/**
 * Hook to consume site-wide dynamic content from the global Context.
 * Returns a map of key-value pairs (e.g., { home_hero_bg: '...' }).
 */
export function useSiteContent() {
  const context = useContext(SiteContentContext)
  
  if (context === undefined) {
    // Return empty state to prevent breakage if used outside provider,
    // though it should ideally be wrapped at the root.
    return { siteContent: {}, loading: false, error: null }
  }
  
  return context
}
