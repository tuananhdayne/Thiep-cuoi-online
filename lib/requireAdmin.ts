import { cookies } from 'next/headers'
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/adminSession'

/**
 * Returns the admin session if the request carries a valid signed cookie,
 * otherwise null. Use inside server route handlers.
 */
export async function getAdminSession(): Promise<{ u: string } | null> {
  const store = await cookies()
  const token = store.get(ADMIN_COOKIE)?.value
  return verifySessionToken(token)
}
