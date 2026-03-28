'use client'

export type RsvpRecord = {
  id: number
  guest_name: string
  attend_status: string
  guest_count: number
  side: string
  created_at: string
}

export default function RsvpManager({ rsvps }: { rsvps: RsvpRecord[] }) {
    const totalAttending = rsvps
        .filter(r => r.attend_status === 'yes')
        .reduce((sum, r) => sum + (r.guest_count || 0), 0)

    const totalMaybe = rsvps
        .filter(r => r.attend_status === 'maybe')
        .length

    const totalDeclined = rsvps
        .filter(r => r.attend_status === 'no')
        .length

    return (
        <div className="bg-white rounded-3xl shadow-2xl shadow-amber-100/50 border border-amber-50 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-amber-50">
                <h2 className="text-xl font-bold text-[#5b3a29]">Xác Nhận Tham Dự (RSVP)</h2>
                <p className="text-sm text-[#9a7d68] mt-1">Danh sách khách mời đã phản hồi tham dự qua thiệp.</p>
            </div>

            {/* Summary blocks */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-[#fffdfa] border-b border-amber-50">
                <div className="text-center p-4 rounded-2xl bg-green-50 text-green-700">
                    <p className="text-2xl font-bold">{totalAttending}</p>
                    <p className="text-xs uppercase font-medium mt-1">Sẽ tham dự</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-amber-50 text-amber-700">
                    <p className="text-2xl font-bold">{totalMaybe}</p>
                    <p className="text-xs uppercase font-medium mt-1">Chưa chắc</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-red-50 text-red-700">
                    <p className="text-2xl font-bold">{totalDeclined}</p>
                    <p className="text-xs uppercase font-medium mt-1">Từ chối</p>
                </div>
            </div>

            <div className="p-6">
                {rsvps.length === 0 ? (
                    <div className="text-center py-10 text-[#9a7d68]">
                        Chưa có khách nào xác nhận tham dự.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-amber-100/50">
                                    <th className="py-3 px-4 font-semibold text-[#8c6f5a] text-sm">Tên khách mời</th>
                                    <th className="py-3 px-4 font-semibold text-[#8c6f5a] text-sm">Trạng thái</th>
                                    <th className="py-3 px-4 font-semibold text-[#8c6f5a] text-sm">Số người</th>
                                    <th className="py-3 px-4 font-semibold text-[#8c6f5a] text-sm">Khách của</th>
                                    <th className="py-3 px-4 font-semibold text-[#8c6f5a] text-sm hidden md:table-cell">Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rsvps.map((rsvp) => (
                                    <tr key={rsvp.id} className="border-b border-amber-50/50 hover:bg-amber-50/20 transition-colors">
                                        <td className="py-4 px-4 font-medium text-[#5b3a29]">{rsvp.guest_name}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                rsvp.attend_status === 'yes' ? 'bg-green-100 text-green-800' :
                                                rsvp.attend_status === 'no' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {rsvp.attend_status === 'yes' ? 'Có' : rsvp.attend_status === 'no' ? 'Không' : 'Chưa chắc'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-[#7b5e4b]">{rsvp.guest_count}</td>
                                        <td className="py-4 px-4 text-[#7b5e4b]">
                                            <span className="bg-amber-100/50 text-amber-800 px-2 py-1 rounded-md text-xs">
                                                {rsvp.side === 'groom' ? 'Nhà trai' : rsvp.side === 'bride' ? 'Nhà gái' : rsvp.side}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-[#9a7d68] text-sm hidden md:table-cell">
                                            {new Date(rsvp.created_at).toLocaleDateString('vi-VN')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
