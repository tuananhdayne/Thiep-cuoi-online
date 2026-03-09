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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Template 1: Classic */}
            <div className="group rounded-[32px] bg-[#fffaf3] border border-amber-50 p-8 transition-all hover:shadow-[0_20px_50px_rgba(91,58,41,0.08)] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5b3a29] to-[#c08a4b]"></div>
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#5b3a29] to-[#c08a4b] mb-6 shadow-inner flex items-center justify-center text-white/50 border-4 border-white">
                <span className="text-3xl font-display">C</span>
              </div>
              <h3 className="text-2xl font-display text-[#5b3a29] mb-3">Classic</h3>
              <p className="text-sm text-[#7b5e4b] mb-8 min-h-[60px]">Nâu và Vàng truyền thống. Mang đến sự ấm áp, sang trọng và thanh lịch tuyệt đối.</p>
              <Link
                href="/demo?theme=classic"
                target="_blank"
                className="inline-block px-6 py-3 bg-white text-[#5b3a29] border border-amber-100 rounded-full text-sm font-medium hover:border-[#c08a4b] transition-colors"
              >
                Xem Trước
              </Link>
            </div>

            {/* Template 2: Rose */}
            <div className="group rounded-[32px] bg-[#fff0f5] border border-pink-50 p-8 transition-all hover:shadow-[0_20px_50px_rgba(212,129,157,0.15)] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5c3a4f] to-[#d4819d]"></div>
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#5c3a4f] to-[#d4819d] mb-6 shadow-inner flex items-center justify-center text-white/50 border-4 border-white">
                <span className="text-3xl font-display">R</span>
              </div>
              <h3 className="text-2xl font-display text-[#5c3a4f] mb-3">Rose</h3>
              <p className="text-sm text-[#8a5a76] mb-8 min-h-[60px]">Sắc hồng nữ tính, ngọt ngào và vô cùng lãng mạn. Lựa chọn hoàn hảo cho tình yêu màu hồng.</p>
              <Link
                href="/demo?theme=rose"
                target="_blank"
                className="inline-block px-6 py-3 bg-white text-[#5c3a4f] border border-pink-100 rounded-full text-sm font-medium hover:border-[#d4819d] transition-colors"
              >
                Xem Trước
              </Link>
            </div>

            {/* Template 3: Ocean */}
            <div className="group rounded-[32px] bg-[#f0f4f8] border border-blue-50 p-8 transition-all hover:shadow-[0_20px_50px_rgba(90,177,187,0.15)] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2c3e50] to-[#5ab1bb]"></div>
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#2c3e50] to-[#5ab1bb] mb-6 shadow-inner flex items-center justify-center text-white/50 border-4 border-white">
                <span className="text-3xl font-display">O</span>
              </div>
              <h3 className="text-2xl font-display text-[#2c3e50] mb-3">Ocean</h3>
              <p className="text-sm text-[#526f8c] mb-8 min-h-[60px]">Mang hơi thở của đại dương. Tươi mát, phóng khoáng và vô cùng hiện đại.</p>
              <Link
                href="/demo?theme=ocean"
                target="_blank"
                className="inline-block px-6 py-3 bg-white text-[#2c3e50] border border-blue-100 rounded-full text-sm font-medium hover:border-[#5ab1bb] transition-colors"
              >
                Xem Trước
              </Link>
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
