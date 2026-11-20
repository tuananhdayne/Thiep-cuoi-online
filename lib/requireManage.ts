import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { manageCookieName, manageTokenMatches } from '@/lib/manageToken'

/**
 * Verifies that the request carries a valid manage token (in the per-couple
 * cookie) for the given couple. Returns true only when the token hashes to the
 * couple's stored manage_token_hash.
 */
export async function verifyManageAccess(
  coupleId: string | number
): Promise<boolean> {
  if (coupleId === undefined || coupleId === null || coupleId === '') return false
  const store = await cookies()
  const token = store.get(manageCookieName(coupleId))?.value
  if (!token) return false

  const { data, error } = await supabaseAdmin
    .from('couples')
    .select('manage_token_hash')
    .eq('id', coupleId)
    .single()

  if (error || !data) return false
  return manageTokenMatches(token, data.manage_token_hash)
}
