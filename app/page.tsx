import Link from 'next/link'
import PetalEffect from './[slug]/components/PetalEffect'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#5b3a29] font-sans selection:bg-[#c08a4b]/30">
      <PetalEffect />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-gradient-to-br from-[#c08a4b]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-bl from-[#e6b877]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8 animate-fade-in-up">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-[#c08a4b] font-semibold">
            Nền Tảng Tạo Thiệp Cưới Trực Tuyến
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#5b3a29] leading-[1.1]">
            Lưu Giữ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c08a4b] to-[#e6b877] italic pr-2">Khoảnh Khắc</span>
            <br /> Trọn Vẹn
          </h1>
          <p className="text-lg md:text-xl text-[#7b5e4b] max-w-2xl mx-auto leading-relaxed">
            Tạo thiệp cưới điện tử mang đậm dấu ấn cá nhân của bạn chỉ trong vài phút.
            Gửi gắm yêu thương, nhận lời chúc phúc và quản lý khách mời dễ dàng.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/create"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#c08a4b] to-[#e6b877] text-white rounded-full font-medium hover:shadow-[0_8px_30px_rgba(192,138,75,0.4)] transition-all hover:-translate-y-1"
            >
              Tạo Thiệp Ngay
            </Link>
            <a
              href="#templates"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#5b3a29] rounded-full font-medium border border-amber-100 hover:border-[#c08a4b] hover:bg-[#fffaf3] transition-all"
            >
              Xem Mẫu Giao Diện
            </a>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-display text-4xl md:text-5xl text-[#5b3a29]">Bộ Sưu Tập Giao Diện</h2>
            <p className="text-[#7b5e4b] max-w-xl mx-auto">
              Lựa chọn từ các phong cách thiết kế độc đáo và tinh tế, được tùy chỉnh để phù hợp với câu chuyện tình yêu của riêng bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Template 1: Classic */}
            <div className="group rounded-[32px] bg-[#fffaf3] border border-amber-50 overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(91,58,41,0.08)] relative flex flex-col h-full">
              <div className="relative h-64 w-full overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
                  alt="Classic Theme"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">Màu Nâu & Vàng</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-display text-[#5b3a29] mb-3">Classic</h3>
                <p className="text-sm text-[#7b5e4b] mb-8 flex-1">Nâu và Vàng truyền thống. Bố cục dọc chuẩn mực mang đến sự ấm áp, sang trọng và thanh lịch tuyệt đối.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=classic"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#5b3a29] border border-amber-200 rounded-full font-medium hover:bg-[#fffaf3] hover:border-[#c08a4b] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=classic"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#5b3a29] to-[#c08a4b] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

            {/* Template 2: Rose */}
            <div className="group rounded-[32px] bg-[#fff0f5] border border-pink-50 overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(212,129,157,0.15)] relative flex flex-col h-full">
              <div className="relative h-64 w-full overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800"
                  alt="Rose Theme"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">Chia Đôi Màn Hình</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-display text-[#5c3a4f] mb-3">Rose</h3>
                <p className="text-sm text-[#8a5a76] mb-8 flex-1">Sắc hồng nữ tính, ngọt ngào. Bố cục hiện đại chia đôi màn hình giúp nổi bật ảnh cưới của bạn.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=rose"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#5c3a4f] border border-pink-200 rounded-full font-medium hover:bg-[#fff0f5] hover:border-[#d4819d] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=rose"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#5c3a4f] to-[#d4819d] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

            {/* Template 3: Ocean */}
            <div className="group rounded-[32px] bg-[#f0f4f8] border border-blue-50 overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(90,177,187,0.15)] relative flex flex-col h-full">
              <div className="relative h-64 w-full overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1544378730-a9254cba7984?auto=format&fit=crop&q=80&w=800"
                  alt="Ocean Theme"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">Căn Giữa Trang Trọng</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-display text-[#2c3e50] mb-3">Ocean</h3>
                <p className="text-sm text-[#526f8c] mb-8 flex-1">Mang hơi thở của đại dương. Giao diện căn giữa điện ảnh, vô cùng hiện đại và phóng khoáng.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=ocean"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#2c3e50] border border-blue-200 rounded-full font-medium hover:bg-[#f0f4f8] hover:border-[#5ab1bb] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=ocean"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#2c3e50] to-[#5ab1bb] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

            {/* Template 4: Modern */}
            <div className="group rounded-[32px] bg-[#f7f4ef] border border-stone-100 overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(140,111,90,0.12)] relative flex flex-col h-full">
              <div className="relative h-64 w-full overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800"
                  alt="Modern Theme"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">Tinh Gọn Hiện Đại</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-display text-[#5b3a29] mb-3">Modern</h3>
                <p className="text-sm text-[#7b5e4b] mb-8 flex-1">Tối giản, cân đối và giàu khoảng thở. Phù hợp với cặp đôi thích cảm giác tinh gọn, hiện đại.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=modern"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#5b3a29] border border-stone-200 rounded-full font-medium hover:bg-[#f7f4ef] hover:border-[#8c6f5a] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=modern"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#5b3a29] to-[#8c6f5a] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

            {/* Template 5: Garden */}
            <div className="group rounded-[32px] bg-[#f5fbf4] border border-emerald-50 overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(94,155,103,0.15)] relative flex flex-col h-full">
              <div className="relative h-64 w-full overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1464965911861-746a04b4bca9?auto=format&fit=crop&q=80&w=800"
                  alt="Garden Theme"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">Sân Vườn Tinh Tế</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-display text-[#24412c] mb-3">Garden</h3>
                <p className="text-sm text-[#5d7d63] mb-8 flex-1">Họa tiết lá, giấy mờ và ánh sáng mềm. Tạo cảm giác thủ công, gần gũi và rất riêng.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=garden"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#24412c] border border-emerald-200 rounded-full font-medium hover:bg-[#f5fbf4] hover:border-[#5e9b67] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=garden"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#24412c] to-[#5e9b67] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

            {/* Template 6: Midnight */}
            <div className="group rounded-[32px] bg-[#0f1720] border border-white/10 overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] relative flex flex-col h-full">
              <div className="relative h-64 w-full overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800"
                  alt="Midnight Theme"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">Đêm Sang Trọng</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col bg-[#0f1720]">
                <h3 className="text-2xl font-display text-[#f5efe6] mb-3">Midnight</h3>
                <p className="text-sm text-[#d4c6b4] mb-8 flex-1">Nền tối, viền vàng mảnh và cảm giác điện ảnh. Phù hợp với thiệp cưới sang trọng, khác biệt.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=midnight"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#0f1720] border border-white/20 rounded-full font-medium hover:bg-[#f5efe6] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=midnight"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#d4af7a] to-[#8c6f5a] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-[#7b5e4b] bg-white border-t border-amber-50">
        <p>&copy; {new Date().getFullYear()} Thiệp Cưới Trực Tuyến. All rights reserved.</p>
      </footer>
    </main>
  )
}
