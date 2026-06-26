import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

export const normalizeEmail = (email = '') => email.trim().toLowerCase()

const parseAdminEmails = (value = '') =>
  String(value)
    .split(',')
    .map((item) => normalizeEmail(item))
    .filter(Boolean)

const rawAdminEmails =
  import.meta.env.VITE_ADMIN_EMAILS ||
  import.meta.env.VITE_ADMIN_EMAIL ||
  'your@email.com'

export const ADMIN_EMAILS = parseAdminEmails(rawAdminEmails)
export const ADMIN_EMAIL = ADMIN_EMAILS[0] || 'your@email.com'
export const isAdminEmail = (email = '') => ADMIN_EMAILS.includes(normalizeEmail(email))

export const getUserEmail = (user = null) =>
  normalizeEmail(
    user?.email ||
    user?.user_metadata?.email ||
    user?.identities?.find?.((item) => item?.identity_data?.email)?.identity_data?.email ||
    '',
  )

export const isAdminUser = (user = null, fallbackEmail = '') => {
  const resolvedEmail = getUserEmail(user) || normalizeEmail(fallbackEmail)
  return isAdminEmail(resolvedEmail)
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase is not fully configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY or VITE_SUPABASE_ANON_KEY.',
  )
}

export default supabase
