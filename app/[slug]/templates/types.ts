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
    id: number
    slug: string
    bride_name: string
    groom_name: string
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
}

export type WeddingGift = {
    id: number
    couple_id: number
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
    id: number
    image_url: string
    caption?: string | null
    sort_order?: number | null
}

export type Wish = {
    id: number
    name: string | null
    message: string
    created_at: string
}

export interface TemplateProps {
    couple: Couple
    gallery: GalleryItem[]
    wishes: Wish[]
    weddingGift?: WeddingGift | null
    locations?: Location | null
}
