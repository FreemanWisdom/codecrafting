import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { createClient } from '@supabase/supabase-js'

const ENV_FILE_PATH = resolve(process.cwd(), '.env')

const parseDotEnv = (content) => {
  const values = {}

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue

    const separatorIndex = line.indexOf('=')
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()

    if (!key) continue

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    values[key] = value
  }

  return values
}

const loadLocalEnv = () => {
  if (!existsSync(ENV_FILE_PATH)) return {}

  try {
    const raw = readFileSync(ENV_FILE_PATH, 'utf8')
    return parseDotEnv(raw)
  } catch (_error) {
    return {}
  }
}

const getArgValue = (flag) => {
  const index = process.argv.indexOf(flag)
  if (index === -1) return ''
  const value = process.argv[index + 1]
  return typeof value === 'string' ? value.trim() : ''
}

const normalizeEmail = (email = '') => email.trim().toLowerCase()

const parseEmailList = (value = '') =>
  String(value)
    .split(',')
    .map((item) => normalizeEmail(item))
    .filter(Boolean)

const localEnv = loadLocalEnv()

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  localEnv.VITE_SUPABASE_URL ||
  ''

const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  localEnv.SUPABASE_SERVICE_ROLE_KEY ||
  ''

const configuredAdminEmails = parseEmailList(
  process.env.VITE_ADMIN_EMAILS ||
  localEnv.VITE_ADMIN_EMAILS ||
  '',
)

const adminEmail =
  process.env.ADMIN_EMAIL ||
  process.env.VITE_ADMIN_EMAIL ||
  localEnv.VITE_ADMIN_EMAIL ||
  configuredAdminEmails[0] ||
  ''

const newPassword =
  getArgValue('--password') ||
  process.env.NEW_PASSWORD ||
  ''

if (!supabaseUrl) {
  console.error('Missing Supabase URL. Set SUPABASE_URL or VITE_SUPABASE_URL.')
  process.exit(1)
}

if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY. Add it to environment or .env (local only).')
  process.exit(1)
}

if (!adminEmail) {
  console.error('Missing admin email. Set ADMIN_EMAIL, VITE_ADMIN_EMAIL, or VITE_ADMIN_EMAILS.')
  process.exit(1)
}

if (!newPassword) {
  console.error('Missing new password. Pass it with --password "your-new-password" or NEW_PASSWORD.')
  process.exit(1)
}

if (newPassword.length < 6) {
  console.error('Password must be at least 6 characters.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

const run = async () => {
  const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  })

  if (usersError) {
    console.error(`Could not list users: ${usersError.message}`)
    process.exit(1)
  }

  const targetEmail = adminEmail.trim().toLowerCase()
  const user = usersData?.users?.find((item) => (item.email || '').trim().toLowerCase() === targetEmail)

  if (!user) {
    console.error(`No auth user found for admin email: ${adminEmail}`)
    process.exit(1)
  }

  const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
    password: newPassword,
  })

  if (updateError) {
    console.error(`Password reset failed: ${updateError.message}`)
    process.exit(1)
  }

  console.log(`Password updated successfully for ${adminEmail}.`)
  console.log('You can now sign in at /login and access /admin.')
}

run()
