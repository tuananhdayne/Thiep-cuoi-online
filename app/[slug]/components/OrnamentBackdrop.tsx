'use client'

type OrnamentBackdropProps = {
  variant: 'garden' | 'midnight' | 'modern'
}

const palettes = {
  garden: {
    wash: 'from-emerald-50 via-white to-lime-50',
    glowA: 'bg-emerald-200/35',
    glowB: 'bg-lime-200/30',
    glowC: 'bg-amber-100/35',
    border: 'border-emerald-100/70',
  },
  midnight: {
    wash: 'from-[#0b1320] via-[#111827] to-[#101a2e]',
    glowA: 'bg-amber-300/20',
    glowB: 'bg-sky-400/15',
    glowC: 'bg-white/10',
    border: 'border-white/10',
  },
  modern: {
    wash: 'from-stone-50 via-white to-amber-50',
    glowA: 'bg-amber-200/25',
    glowB: 'bg-rose-200/20',
    glowC: 'bg-slate-200/20',
    border: 'border-amber-100/60',
  },
}

export default function OrnamentBackdrop({ variant }: OrnamentBackdropProps) {
  const palette = palettes[variant]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${palette.wash}`} />
      <div className={`absolute -top-28 -left-24 h-80 w-80 rounded-full blur-3xl ${palette.glowA}`} />
      <div className={`absolute top-16 -right-28 h-96 w-96 rounded-full blur-3xl ${palette.glowB}`} />
      <div className={`absolute -bottom-24 left-1/3 h-72 w-72 rounded-full blur-3xl ${palette.glowC}`} />
      <div
        className={`absolute inset-0 opacity-[0.12] ${palette.border}`}
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent" />
      <div className="absolute left-0 top-0 h-40 w-40 rounded-br-full border-r border-b border-current/10" />
      <div className="absolute right-0 bottom-0 h-40 w-40 rounded-tl-full border-l border-t border-current/10" />
    </div>
  )
}
