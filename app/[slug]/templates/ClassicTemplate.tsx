"use client"

import React from 'react'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'
import LocationSection from '../components/LocationSection'
import RsvpSection from '../components/RsvpSection'
import Countdown from '../components/Countdown'
import WishSection from '../components/WishSection'
import PetalEffect from '../components/PetalEffect'
import Footer from '../components/Footer'
import AudioPlayer from '../components/AudioPlayer'
import GiftSection from '../components/GiftSection'
import { TemplateProps } from './types'

export default function ClassicTemplate(props: TemplateProps | any) {
    // Defensive defaults: some callers (demo preview) may pass null/undefined
    const {
        couple = {
            id: 0,
            slug: 'demo',
            bride_name: '',
            groom_name: '',
            intro_description: '',
            wedding_date: '',
            wedding_time: '',
            theme: 'classic',
        },
        gallery = [],
        wishes = [],
        weddingGift = null,
        locations = undefined,
    } = props || {}

    const heroBackground = gallery?.[0]?.image_url || couple?.bride_avatar || couple?.groom_avatar || undefined

    const themeClass = couple?.theme && couple.theme !== 'classic' ? `theme-${couple.theme}` : 'theme-classic'

    return (
        <div className={`bg-white text-primary overflow-hidden ${themeClass}`}>
            <PetalEffect />

            <Hero
                brideName={couple.bride_name}
                groomName={couple.groom_name}
                introDescription={couple.intro_description}
                weddingDate={couple.wedding_date}
                weddingTime={couple.wedding_time}
                backgroundImage={heroBackground}
            />

            <div className="bg-white">
            {(() => {
                return (
                    <LocationSection
                        weddingDate={couple.wedding_date}
                        weddingTime={couple.wedding_time}
                        brideInfo={{
                            title: locations?.bride_event_title,
                            location: locations?.bride_location,
                            address: locations?.bride_address,
                            mapEmbedUrl: locations?.bride_google_map_embed,
                        }}
                        groomInfo={{
                            title: locations?.groom_event_title,
                            location: locations?.groom_location,
                            address: locations?.groom_address,
                            mapEmbedUrl: locations?.groom_google_map_embed,
                        }}
                    />
                )
            })()}

            <Countdown
                weddingDate={couple.wedding_date}
                weddingTime={couple.wedding_time}
            />

            <Gallery images={gallery || []} />

            <GiftSection couple={couple} weddingGift={weddingGift} />

            <RsvpSection
                coupleId={couple.id}
                brideAvatar={gallery?.[1]?.image_url || couple.bride_avatar}
                groomAvatar={gallery?.[0]?.image_url || couple.groom_avatar}
            />

            <WishSection coupleId={couple.id} initialWishes={wishes || []} />

            <Footer
                bride={couple.bride_name}
                groom={couple.groom_name}
                date={couple.wedding_date}
            />
            </div>

            <AudioPlayer
                musicUrl={couple.music_url}
                delay={couple.music_delay}
                volume={couple.music_volume}
                autoplay={couple.music_autoplay}
            />
        </div>
    )
}
