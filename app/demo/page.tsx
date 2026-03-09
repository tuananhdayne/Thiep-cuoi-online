import Hero from '../[slug]/components/Hero'
import LocationSection from '../[slug]/components/LocationSection'
import RsvpSection from '../[slug]/components/RsvpSection'
import Countdown from '../[slug]/components/Countdown'
import WishSection from '../[slug]/components/WishSection'
import PetalEffect from '../[slug]/components/PetalEffect'
import Footer from '../[slug]/components/Footer'
import Gallery from '../[slug]/components/Gallery'
import StoryTimeline from '../[slug]/components/StoryTimeline'

export default async function DemoPage({
    searchParams,
}: {
    searchParams: Promise<{ theme?: string }>
}) {
    const { theme } = await searchParams

    // Validate theme, default to classic
    const validTheme = (['classic', 'rose', 'ocean'].includes(theme || '') ? theme : 'classic') as string
    const themeClass = validTheme !== 'classic' ? `theme-${validTheme}` : ''

    // Mock Data for Demo
    const mockCouple = {
        bride_name: 'Ngọc Lan',
        groom_name: 'Minh Khang',
        intro_description: 'Cùng nhau bắt đầu một chương mới của cuộc đời.',
        wedding_date: '2025-12-25',
        wedding_time: '18:00',
        bride_event_title: 'Lễ Vu Quy',
        bride_event_date: '2025-12-24',
        bride_event_time: '09:00',
        bride_location: 'Tư Gia Nhà Gái',
        bride_address: '123 Đường Hoa Hồng, Quận 1, TP. HCM',
        groom_event_title: 'Tiệc Cưới',
        groom_event_date: '2025-12-25',
        groom_event_time: '18:00',
        groom_location: 'Trung tâm Hội nghị The Grand',
        groom_address: '456 Đại lộ Hạnh Phúc, Quận 7, TP. HCM',
    }

    const mockGallery = [
        { id: 1, image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80' },
        { id: 2, image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80' },
        { id: 3, image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80' },
        { id: 4, image_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80' },
    ]

    const mockTimeline = [
        { title: 'Lần đầu gặp gỡ', date: 'Tháng 1, 2021', description: 'Một buổi chiều mùa xuân ấm áp, ánh mắt chạm nhau tại quán cafe nhỏ quen thuộc.' },
        { title: 'Lời tỏ tình', date: 'Tháng 6, 2021', description: 'Dưới bầu trời đầy sao, anh nhẹ nhàng nắm tay và nói lời yêu.' },
        { title: 'Chung một con đường', date: 'Tháng 12, 2024', description: 'Khép lại chặng đường hẹn hò, chúng mình quyết định cùng nhau xây dựng tổ ấm.' },
    ]

    const mockWishes = [
        { id: 1, name: 'Hội bạn thân', message: 'Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử nhé!', created_at: new Date().toISOString() },
        { id: 2, name: 'Đồng nghiệp', message: 'Mãi mãi yêu thương và đồng hành cùng nhau nhé anh chị.', created_at: new Date(Date.now() - 86400000).toISOString() },
    ]

    return (
        <main className={`bg-bg-main text-primary overflow-hidden ${themeClass}`}>
            <PetalEffect />

            {/* Floating Notice */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up pointer-events-none">
                <div className="bg-primary text-bg-main px-6 py-2 rounded-full shadow-2xl flex items-center gap-3">
                    <span className="text-xl">✨</span>
                    <p className="text-sm font-semibold tracking-wide">Chế Độ Xem Thử (Giao diện: {validTheme.charAt(0).toUpperCase() + validTheme.slice(1)})</p>
                </div>
            </div>

            <Hero
                brideName={mockCouple.bride_name}
                groomName={mockCouple.groom_name}
                introDescription={mockCouple.intro_description}
                weddingDate={mockCouple.wedding_date}
                weddingTime={mockCouple.wedding_time}
                backgroundImage={mockGallery[0].image_url}
            />

            <StoryTimeline items={mockTimeline} />

            <LocationSection
                brideInfo={{
                    title: mockCouple.bride_event_title,
                    date: mockCouple.bride_event_date,
                    time: mockCouple.bride_event_time,
                    location: mockCouple.bride_location,
                    address: mockCouple.bride_address,
                }}
                groomInfo={{
                    title: mockCouple.groom_event_title,
                    date: mockCouple.groom_event_date,
                    time: mockCouple.groom_event_time,
                    location: mockCouple.groom_location,
                    address: mockCouple.groom_address,
                }}
            />

            <Countdown weddingDate={mockCouple.wedding_date} weddingTime={mockCouple.wedding_time} />

            <Gallery images={mockGallery} />

            <RsvpSection
                coupleId={0}
                brideAvatar={mockGallery[1].image_url}
                groomAvatar={mockGallery[2].image_url}
            />

            <WishSection coupleId={0} initialWishes={mockWishes} />

            <Footer bride={mockCouple.bride_name} groom={mockCouple.groom_name} date={mockCouple.wedding_date} />
        </main>
    )
}
