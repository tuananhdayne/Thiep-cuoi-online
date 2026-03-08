'use client'

import { useState } from 'react'

export type ImageSizes = {
    original: string
    '350': string
    '550': string
    '750': string
    '1200': string
}

interface ImageUploaderProps {
    weddingId: string | number
    onUploadSuccess: (results: ImageSizes[]) => void
}

export default function ImageUploader({ weddingId, onUploadSuccess }: ImageUploaderProps) {
    const [files, setFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const selectedFiles = Array.from(e.target.files)

        // Validate number of files
        if (files.length + selectedFiles.length > 15) {
            setError('You can only upload a maximum of 15 images in total.')
            return
        }

        // Validate file types
        const validFiles = selectedFiles.filter(file =>
            ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
        )

        if (validFiles.length !== selectedFiles.length) {
            setError('Only JPG, JPEG, and PNG files are allowed.')
        } else {
            setError(null)
        }

        setFiles(prev => [...prev, ...validFiles])

        // Generate previews
        const newPreviews = validFiles.map(file => URL.createObjectURL(file))
        setPreviews(prev => [...prev, ...newPreviews])
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
        setPreviews(prev => {
            URL.revokeObjectURL(prev[index])
            return prev.filter((_, i) => i !== index)
        })
    }

    const handleUpload = async () => {
        if (!files.length) return
        setUploading(true)
        setError(null)

        const formData = new FormData()
        formData.append('weddingId', weddingId.toString())
        files.forEach(file => {
            formData.append('images', file)
        })

        try {
            const response = await fetch('/api/upload-images', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed')
            }

            onUploadSuccess(data.results)
            // Clear forms
            setFiles([])
            setPreviews([])

        } catch (err: any) {
            setError(err.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Upload Album Photos</h3>
                    <p className="text-sm text-gray-500">
                        JPG, PNG. Max 15 images. Images will be automatically optimized.
                    </p>
                </div>

                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={handleFileChange}
                            disabled={uploading || files.length >= 15}
                        />
                    </label>
                </div>

                {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                {previews.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-700">{files.length} of 15 selected</p>
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="bg-[#c08a4b] hover:bg-[#a6753c] text-white px-4 py-2 rounded-full text-sm font-medium transition disabled:opacity-50"
                            >
                                {uploading ? 'Processing & Uploading...' : 'Upload Photos'}
                            </button>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {previews.map((src, idx) => (
                                <div key={src} className="relative group rounded-lg overflow-hidden bg-gray-100 aspect-square">
                                    <img src={src} className="w-full h-full object-cover" alt="Preview" />
                                    <button
                                        onClick={() => removeFile(idx)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                        aria-label="Remove image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
