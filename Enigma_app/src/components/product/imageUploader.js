import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

const ImageUploader = ({ initialImages = [], onImageSelect }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    setSelectedImages(initialImages);
  }, [initialImages]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    const compressedFiles = await Promise.all(
        files.map(file =>
          imageCompression(file, {
            maxSizeMB: 0.2,                // Nén xuống dưới 200KB
            maxWidthOrHeight: 500,         // Resize tối đa chiều dài/chiều cao là 500px
            useWebWorker: true,            // Dùng web worker để giảm tải cho main thread
            initialQuality: 0.5,           // Đặt chất lượng khởi điểm xuống 50%
            fileType: 'image/jpeg',        // Chuyển tất cả ảnh sang JPEG
          })
        )
      );

    const base64Images = await Promise.all(
      compressedFiles.map(convertToBase64)
    );

    const updated = [...selectedImages, ...base64Images];
    setSelectedImages(updated);
    onImageSelect(updated);
  };

  const handleImageRemove = (index) => {
    const updated = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updated);
    onImageSelect(updated);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 w-full mb-4"
      />

      {selectedImages.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {selectedImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Preview ${index}`}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
