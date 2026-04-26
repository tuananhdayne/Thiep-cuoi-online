'use client'

import { useState } from 'react'

interface SingleImageUploaderProps {
    weddingId: string | number
    onUploadSuccess: (url: string) => void
    label?: string
}

export default function SingleImageUploader({ weddingId, onUploadSuccess, label = "Tải ảnh lên" }: SingleImageUploaderProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return
        const file = e.target.files[0]

        // Validate
        if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
            setError('Chỉ chấp nhận ảnh JPG, PNG, WebP.')
            return
        }

        setUploading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('weddingId', weddingId.toString())
            formData.append('images', file)

            const response = await fetch('/api/upload-images', {
                method: 'POST',
                body: formData
            })

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch(err) {
                throw new Error(`Lỗi máy chủ: ${text.substring(0, 100)}...`);
            }

            if (!response.ok) {
                throw new Error(data.error || 'Lỗi tải ảnh lên')
            }

            if (data.results && data.results.length > 0) {
                onUploadSuccess(data.results[0].original)
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="w-full">
            <label className={`relative flex items-center justify-center w-full h-[46px] border border-dashed rounded-xl cursor-pointer transition ${uploading ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-[#d9b1eb] bg-white hover:bg-gray-50'}`}>
                {uploading ? (
                    <span className="text-sm text-[#9a7d68] font-medium flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-[#9a7d68]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang tải...
                    </span>
                ) : (
                    <span className="text-sm text-[#7b5e4b] flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#7b5e4b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        {label}
                    </span>
                )}
                <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={handleFileChange}
                    disabled={uploading}
                />
            </label>
            {error && <p className="text-xs text-red-500 mt-1.5 px-1">{error}</p>}
        </div>
    )
}
