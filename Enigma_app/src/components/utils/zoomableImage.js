'use client'

import { useState } from 'react'

export default function ZoomableImage({ src, alt = 'Image', className = '' }) {
  const [zoomed, setZoomed] = useState(false)

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-pointer`}
        onClick={() => setZoomed(true)}
      />
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
          onClick={() => setZoomed(false)}
        >
          <img
            src={src}
            alt="Zoomed"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-xl"
          />
        </div>
      )}
    </>
  )
}
