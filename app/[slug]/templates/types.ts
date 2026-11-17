export type Location = {
    id: string
    couple_id: string
    bride_event_title?: string | null
    bride_location?: string | null
    bride_address?: string | null
    bride_google_map_embed?: string | null
    bride_event_date?: string | null
    bride_event_time?: string | null
    groom_event_title?: string | null
    groom_location?: string | null
    groom_address?: string | null
    groom_google_map_embed?: string | null
    groom_event_date?: string | null
    groom_event_time?: string | null
}

export type Couple = {
    id: string | number
    slug: string
    bride_name: string
    groom_name: string
    hero_image?: string | null
    bride_avatar?: string | null
    groom_avatar?: string | null
    intro_title?: string | null
    intro_description?: string | null
    wedding_date?: string | null
    wedding_time?: string | null
    location?: string | null
    address?: string | null
    music_url?: string | null
    music_delay?: number | null
    music_volume?: number | null
    music_autoplay?: boolean | null
    theme?: string | null
    expires_at?: string | null
    // Event details
    bride_event_title?: string | null
    bride_event_date?: string | null
    bride_event_time?: string | null
    bride_location?: string | null
    bride_address?: string | null
    bride_google_map_embed?: string | null
    groom_event_title?: string | null
    groom_event_date?: string | null
    groom_event_time?: string | null
    groom_location?: string | null
    groom_address?: string | null
    groom_google_map_embed?: string | null
    // Gift details
    gift_enabled?: boolean | null
    groom_bank_name?: string | null
    groom_bank_holder?: string | null
    groom_bank_account?: string | null
    groom_bank_qr?: string | null
    bride_bank_name?: string | null
    bride_bank_holder?: string | null
    bride_bank_account?: string | null
    bride_bank_qr?: string | null
}

export type WeddingGift = {
    id: string | number
    couple_id: string | number
    is_enabled: boolean
    groom_bank_name?: string | null
    groom_bank_holder?: string | null
    groom_bank_account?: string | null
    groom_bank_qr?: string | null
    bride_bank_name?: string | null
    bride_bank_holder?: string | null
    bride_bank_account?: string | null
    bride_bank_qr?: string | null
}

export type GalleryItem = {
    id: string | number
    image_url: string
    caption?: string | null
    sort_order?: number | null
}

export type Wish = {
    id: string | number
    name: string | null
    message: string
    attendance?: 'yes' | 'no' | 'maybe' | null
    couple_id?: string | number
    created_at: string
}

export type Story = {
    id: string | number
    couple_id?: string | number
    title: string
    story_date?: string | null
    description: string
    image_url?: string | null
    sort_order?: number | null
}

export interface TemplateProps {
    couple: Couple
    gallery: GalleryItem[]
    wishes: Wish[]
    weddingGift?: WeddingGift | null
    locations?: Location | null
    stories?: Story[]
    guestName?: string
    defaultOpen?: boolean
}
