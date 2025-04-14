'use client'

import { useState, useRef } from 'react'
import ZoomableImage from '../utils/zoomableImage'

export default function ProfileImageUploader({
  currentImage,
  onUploadSuccess = () => {},
}) {
  const [preview, setPreview] = useState(currentImage)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64String = reader.result

      try {
        setUploading(true)
        const res = await fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ profilePicture: base64String }),
        })

        const data = await res.json()
        setUploading(false)

        if (!res.ok) throw new Error(data.error || 'Upload failed')

        setPreview(base64String)
        onUploadSuccess(base64String)
      } catch (err) {
        console.error(err)
        alert(err.message)
        setUploading(false)
      }
    }

    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
  <div className="relative w-32 h-32 group cursor-pointer overflow-hidden rounded-full">
    <ZoomableImage
      src={preview || '/default-avatar.jpg'}
      alt="Profile"
      className="w-full h-full object-cover"
    />

    <div
      className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-1/3"
      onClick={triggerFileInput}
    >
      Change image
    </div>

    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleImageChange}
      className="hidden"
    />

    {uploading && (
      <p className="text-sm text-blue-500 mt-2">Đang tải ảnh...</p>
    )}
  </div>

  )
}
