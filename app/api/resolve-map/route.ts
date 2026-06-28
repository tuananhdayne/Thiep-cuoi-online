import { NextResponse } from 'next/server'
import https from 'https'

export const dynamic = 'force-dynamic'

function resolveRedirect(url: string): Promise<string> {
  return new Promise((resolve) => {
    try {
      const req = https.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          resolve(res.headers.location)
        } else {
          resolve(url)
        }
      })
      req.on('error', () => resolve(url))
      req.on('timeout', () => {
        req.destroy()
        resolve(url)
      })
      req.end()
    } catch {
      resolve(url)
    }
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
  }

  try {
    const resolvedUrl = await resolveRedirect(url)
    return NextResponse.json({ resolvedUrl })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to resolve URL' }, { status: 500 })
  }
}
