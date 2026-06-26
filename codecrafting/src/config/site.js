const FALLBACK_SITE_URL = 'https://codinggroups.com'

const trimTrailingSlash = (value = '') => value.replace(/\/+$/, '')
const isAbsoluteUrl = (value = '') => /^https?:\/\//i.test(value)

export const SITE_URL = trimTrailingSlash(import.meta.env.VITE_SITE_URL || FALLBACK_SITE_URL)
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || ''
export const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || ''

export const toAbsoluteUrl = (value = '/') => {
  if (!value) {
    return SITE_URL
  }

  if (isAbsoluteUrl(value)) {
    return value
  }

  const normalizedPath = value.startsWith('/') ? value : `/${value}`
  return `${SITE_URL}${normalizedPath}`
}
