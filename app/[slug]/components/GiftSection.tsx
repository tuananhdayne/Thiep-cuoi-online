'use client'

import React from 'react'
import type { Couple, WeddingGift } from '../templates/types'

interface GiftSectionProps {
  couple: Couple
  weddingGift?: WeddingGift | null
}

export default function GiftSection({ couple, weddingGift }: GiftSectionProps) {
  if (!weddingGift?.is_enabled) return null
  if (!weddingGift?.groom_bank_account && !weddingGift?.bride_bank_account) return null

  return (
    <section
      id="gift"
      className="mx-auto max-w-3xl px-4 py-14 md:py-20"
    >
      <div className="text-center mb-10">
        <p className="text-[0.68rem] uppercase tracking-[0.45em] text-accent mb-2">
          Wedding Gift
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-primary">
          Hộp Mừng Cưới
        </h2>
        <p className="mt-3 text-sm text-primary-light italic max-w-md mx-auto">
          Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nha. Cảm ơn bạn rất nhiều!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Groom bank card */}
        {weddingGift?.groom_bank_account && (
          <div className="rounded-2xl border border-border-light bg-bg-alt p-6 text-center shadow-sm">
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-accent mb-4">
              ❀ Mừng cưới đến chú rể
            </p>
            {weddingGift?.groom_bank_qr && (
              <div className="flex justify-center mb-4">
                <img
                  src={weddingGift?.groom_bank_qr}
                  alt="QR chú rể"
                  className="w-36 h-36 object-contain rounded-xl border border-border-light"
                />
              </div>
            )}
            <div className="space-y-1 text-sm text-primary-light">
              {weddingGift?.groom_bank_name && (
                <p>Ngân hàng: <strong className="text-primary">{weddingGift?.groom_bank_name}</strong></p>
              )}
              {weddingGift?.groom_bank_holder && (
                <p>Tên: <strong className="text-primary">{weddingGift?.groom_bank_holder}</strong></p>
              )}
              <p>STK: <strong className="text-primary">{weddingGift?.groom_bank_account}</strong></p>
            </div>
          </div>
        )}

        {/* Bride bank card */}
        {weddingGift?.bride_bank_account && (
          <div className="rounded-2xl border border-border-light bg-bg-alt p-6 text-center shadow-sm">
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-accent mb-4">
              ❀ Mừng cưới đến cô dâu
            </p>
            {weddingGift?.bride_bank_qr && (
              <div className="flex justify-center mb-4">
                <img
                  src={weddingGift?.bride_bank_qr}
                  alt="QR cô dâu"
                  className="w-36 h-36 object-contain rounded-xl border border-border-light"
                />
              </div>
            )}
            <div className="space-y-1 text-sm text-primary-light">
              {weddingGift?.bride_bank_name && (
                <p>Ngân hàng: <strong className="text-primary">{weddingGift?.bride_bank_name}</strong></p>
              )}
              {weddingGift?.bride_bank_holder && (
                <p>Tên: <strong className="text-primary">{weddingGift?.bride_bank_holder}</strong></p>
              )}
              <p>STK: <strong className="text-primary">{weddingGift?.bride_bank_account}</strong></p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
