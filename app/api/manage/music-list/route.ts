import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

// Shared library of background-music tracks, stored in the public
// `wedding-music` Supabase Storage bucket. Returns the list of audio files
// (name + public URL) so the manage UI can let the couple pick one.
const BUCKET = 'wedding-music'

export async function GET() {
  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .list('', { limit: 200, sortBy: { column: 'name', order: 'asc' } })

  if (error) {
    return NextResponse.json({ error: 'Không tải được danh sách nhạc' }, { status: 500 })
  }

  const tracks = (data || [])
    .filter((f) => f.id && /\.(mp3|m4a|aac|ogg|wav)$/i.test(f.name))
    .map((f) => {
      const { data: pub } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(f.name)
      return { name: f.name, url: pub.publicUrl }
    })

  return NextResponse.json({ tracks })
}
