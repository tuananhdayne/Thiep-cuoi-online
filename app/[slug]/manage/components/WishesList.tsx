type Wish = {
  id: number
  name: string | null
  message: string
  created_at: string
}

type WishesListProps = {
  wishes: Wish[]
}

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))

export default function WishesList({ wishes }: WishesListProps) {
  if (!wishes || wishes.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-amber-50 shadow-[0_20px_50px_rgba(92,65,35,0.08)] p-6">
        <div className="space-y-1 mb-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8c6f5a]">Lời chúc</p>
          <h3 className="font-display text-2xl text-[#5b3a29]">Những lời yêu thương</h3>
          <p className="text-sm text-[#9a7d68]">Chưa có lời chúc nào.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-amber-50 shadow-[0_20px_50px_rgba(92,65,35,0.08)] p-6 space-y-4">
      <div className="space-y-1 mb-2">
        <p className="text-xs uppercase tracking-[0.28em] text-[#8c6f5a]">Lời chúc</p>
        <h3 className="font-display text-2xl text-[#5b3a29]">Những lời yêu thương</h3>
        <p className="text-sm text-[#9a7d68]">Sắp xếp mới nhất trước.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {wishes.map((wish) => (
          <div
            key={wish.id}
            className="rounded-2xl border border-[#eedfcc] bg-[#fffaf3] px-4 py-3 shadow-sm"
          >
            <div className="flex items-center justify-between text-sm font-semibold text-[#5b3a29]">
              <span>{wish.name || 'Ẩn danh'}</span>
              <span className="text-xs text-[#7b5e4b]">{formatDateTime(wish.created_at)}</span>
            </div>
            <p className="mt-2 text-sm text-[#5b3a29] leading-relaxed">{wish.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
