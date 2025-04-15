'use client'

import { useState } from 'react'
import ZoomableImage from '../utils/zoomableImage'

export default function ProfileImageUploader({
  currentImage,
  onUploadSuccess = () => {},
}) {
  const [preview, setPreview] = useState(currentImage)
  const [uploading, setUploading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [urlInput, setUrlInput] = useState('')

  const handleConfirmUrl = async () => {
    if (!urlInput) return
    try {
      setUploading(true)
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ profilePicture: urlInput }),
      })

      const data = await res.json()
      setUploading(false)
      setShowModal(false)

      if (!res.ok) throw new Error(data.error || 'Upload failed')

      setPreview(urlInput)
      onUploadSuccess(urlInput)
      setUrlInput('')
    } catch (err) {
      console.error(err)
      alert(err.message)
      setUploading(false)
    }
  }

  return (
    <>
      <div className="relative w-32 h-32 group cursor-pointer overflow-hidden rounded-full">
        <ZoomableImage
          src={preview || '/default-avatar.jpg'}
          alt="Profile"
          className="w-full h-full object-cover"
        />

        {/* Giữ nguyên overlay đẹp */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-1/3"
          onClick={() => setShowModal(true)}
        >
          Dán URL bên dưới
        </div>
      </div>

      {uploading && <p className="text-sm text-blue-500 mt-2">Đang tải ảnh...</p>}

      {/* Modal dán URL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Nhập URL ảnh</h2>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:underline"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmUrl}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
