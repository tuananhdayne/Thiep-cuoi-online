'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * If the manage page was opened with a ?token=... in the URL, exchange it for an
 * httpOnly cookie (so the token is not left in the address bar / history) and
 * then strip it from the URL.
 */
export default function ManageSessionSync({ coupleId }: { coupleId: string | number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) return
    ;(async () => {
      try {
        await fetch('/api/manage/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ coupleId, token }),
        })
      } catch {
        /* ignore */
      } finally {
        router.replace(pathname)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
