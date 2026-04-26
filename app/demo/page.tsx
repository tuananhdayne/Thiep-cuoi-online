import { Couple, GalleryItem, Wish } from '../[slug]/templates/types'
import { getThemeDisplayName, loadTemplate, supportedThemes } from '../[slug]/templates/templateLoader'

export default async function DemoPage({
    searchParams,
}: {
    searchParams: Promise<{ theme?: string; embedded?: string }>
}) {
    const { theme, embedded } = await searchParams
    const requestedTheme = theme || 'classic'
    const isEmbedded = embedded === '1'

    // Validate theme, default to classic
    const validTheme = supportedThemes.includes(requestedTheme as (typeof supportedThemes)[number])
        ? requestedTheme
        : 'classic'

    // Mock Data for Demo
    const mockCouple: Couple = {
        id: 0,
        slug: 'demo',
        bride_name: 'Ngọc Lan',
        groom_name: 'Minh Khang',
        intro_description: 'Cùng nhau bắt đầu một chương mới của cuộc đời. Sự hiện diện của bạn là niềm vinh hạnh của chúng tôi.',
        wedding_date: '2025-12-25',
        wedding_time: '18:00',
        location: 'Trung tâm Tiệc cưới The Grand',
        address: 'Quận 1, TP. HCM',
        theme: validTheme,
    }

    const mockLocations = {
        id: '1',
        couple_id: '0',
        bride_event_title: 'Lễ Vu Quy',
        bride_event_date: '2025-12-24',
        bride_event_time: '09:00',
        bride_location: 'Tư Gia Nhà Gái',
        bride_address: '123 Đường Hoa Hồng, Quận 1, TP. HCM',
        bride_google_map_embed: '',
        groom_event_title: 'Tiệc Cưới',
        groom_event_date: '2025-12-25',
        groom_event_time: '18:00',
        groom_location: 'Trung tâm Hội nghị The Grand',
        groom_address: '456 Đại lộ Hạnh Phúc, Quận 7, TP. HCM',
        groom_google_map_embed: ''
    }

    const mockGift = {
        id: 1,
        couple_id: 0,
        is_enabled: true,
        groom_bank_name: 'Vietcombank',
        groom_bank_holder: 'NGUYEN MINH KHANG',
        groom_bank_account: '9948240614',
        groom_bank_qr: 'https://img.vietqr.io/image/VCB-9948240614-compact.png',
        bride_bank_name: 'Vietcombank',
        bride_bank_holder: 'TRAN NGOC LAN',
        bride_bank_account: '1062395400',
        bride_bank_qr: 'https://img.vietqr.io/image/VCB-1062395400-compact.png',
    }

    const mockGallery: GalleryItem[] = [
        { id: 1, image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80' },
        { id: 2, image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80' },
        { id: 3, image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80' },
        { id: 4, image_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80' },
    ]

    const mockWishes: Wish[] = [
        { id: 1, name: 'Hội bạn thân', message: 'Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử nhé!', created_at: new Date().toISOString() },
        { id: 2, name: 'Đồng nghiệp', message: 'Mãi mãi yêu thương và đồng hành cùng nhau nhé anh chị.', created_at: new Date(Date.now() - 86400000).toISOString() },
    ]

    const TemplateToRender = await loadTemplate(validTheme)

    return (
        <main className="relative">
            {/* Floating Notice pointing back to Home or Create */}
            {!isEmbedded && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-fade-in-up flex flex-col items-center gap-2">
                    <div className="bg-primary text-bg-main px-6 py-2 rounded-full shadow-2xl flex items-center gap-3">
                        <span className="text-xl">✨</span>
                        <p className="text-sm font-semibold tracking-wide">
                            Bản Xem Thử (Mẫu: {getThemeDisplayName(validTheme)})
                        </p>
                    </div>
                    <a
                        href={`/create?theme=${validTheme}`}
                        className="bg-white/90 backdrop-blur-sm text-primary px-5 py-2 rounded-full shadow-lg text-xs font-bold hover:bg-white hover:scale-105 transition-all flex items-center gap-2"
                    >
                        Tạo Thiệp Với Mẫu này ➔
                    </a>
                </div>
            )}

            <TemplateToRender
                couple={mockCouple}
                gallery={mockGallery}
                wishes={mockWishes}
                weddingGift={mockGift}
                locations={mockLocations}
            />
        </main>
    )
}
