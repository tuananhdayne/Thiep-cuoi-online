import { createClient } from '@supabase/supabase-js'

// Server-ONLY Supabase client. NEVER import this into a client component.
// Uses the service_role key when configured; otherwise falls back to the anon
// key so the app keeps working before the key is set (while RLS is still open).
// Once RLS is locked down (migration-rls-lockdown.sql), the service_role key
// MUST be configured or privileged server operations will fail.

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const fallbackKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'dummy-key'

/** True when a real service_role key is configured. */
export const hasServiceRole = Boolean(serviceRoleKey)

if (!hasServiceRole) {
  console.warn(
    '⚠️ SUPABASE_SERVICE_ROLE_KEY is not set. supabaseAdmin is falling back to the anon key. ' +
      'Privileged writes will only work while RLS is open. Set the key before locking down RLS.'
  )
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey || fallbackKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})
