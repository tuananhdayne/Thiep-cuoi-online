import Link from 'next/link'
import PetalEffect from './[slug]/components/PetalEffect'
import { getThemeDisplayName } from './[slug]/templates/templateLoader'

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
                  alt="Cổ Điển Hoàng Kim"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">{getThemeDisplayName('classic')}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-display text-[#5b3a29] mb-3">{getThemeDisplayName('classic')}</h3>
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

            {/* Template 2: Heritage */}
            <div className="group rounded-[32px] bg-[#eef6f2] border border-[#cde3dd] overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(23,74,67,0.14)] relative flex flex-col h-full">
              <div className="relative h-64 w-full overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&q=80&w=800"
                  alt="Hỷ Sắc Cổ Truyền"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c2d29]/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">{getThemeDisplayName('heritage')}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col bg-[#eef6f2]">
                <h3 className="text-2xl font-display text-[#174a43] mb-3">{getThemeDisplayName('heritage')}</h3>
                <p className="text-sm text-[#3f6b64] mb-8 flex-1">Tông ngọc cổ trang nhã, hoa văn truyền thống và bố cục trang trọng, đậm chất thiệp cưới Việt Nam.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=heritage"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#174a43] border border-[#cde3dd] rounded-full font-medium hover:bg-[#eaf5f1] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=heritage"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#0f766e] to-[#2a9d8f] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  >
                    Tạo Thiệp
                  </Link>
                </div>
              </div>
            </div>

            {/* Template 3: Midnight */}
            <div className="group rounded-[32px] bg-[#0f1720] border border-white/10 overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] relative flex flex-col h-full">
              <div className="relative h-64 w-full overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800"
                  alt="Dạ Tiệc Ánh Kim"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">{getThemeDisplayName('midnight')}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col bg-[#0f1720]">
                <h3 className="text-2xl font-display text-[#f5efe6] mb-3">{getThemeDisplayName('midnight')}</h3>
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

            {/* Template 4: Elegance */}
            <div className="group rounded-[32px] bg-[#f8f6f1] border border-[#d4c5a9]/30 overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(45,42,38,0.1)] relative flex flex-col h-full">
              <div className="relative h-64 w-full overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800"
                  alt="Thanh Lịch Tân Cổ Điển"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d2a26]/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider">{getThemeDisplayName('elegance')}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col bg-[#f8f6f1]">
                <h3 className="text-2xl font-display text-[#2d2a26] mb-3">{getThemeDisplayName('elegance')}</h3>
                <p className="text-sm text-[#4a453d] mb-8 flex-1">Tối giản kết hợp tân cổ điển. Nền ngà, viền vàng đồng, typography thanh lịch — thiết kế mobile-first cuộn dọc sang trọng.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo?theme=elegance"
                    target="_blank"
                    className="flex-1 text-center py-3.5 px-4 bg-white text-[#2d2a26] border border-[#d4c5a9]/40 rounded-full font-medium hover:bg-[#faf8f4] hover:border-[#b39a6a] transition-all text-sm"
                  >
                    Xem Thử
                  </Link>
                  <Link
                    href="/create?theme=elegance"
                    className="flex-1 text-center py-3.5 px-4 bg-gradient-to-r from-[#b39a6a] to-[#d4c5a9] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
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
