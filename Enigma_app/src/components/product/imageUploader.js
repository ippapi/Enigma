import React, { useState, useEffect } from 'react';

const ImageUploader = ({ initialImages = [], onImageSelect }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    if(initialImages)
      setSelectedImages(initialImages);
  }, [initialImages]);

  const handleAddUrl = () => {
    const trimmedUrl = urlInput.trim();
    if (trimmedUrl && !selectedImages.includes(trimmedUrl)) {
      const updated = [...selectedImages, trimmedUrl];
      setSelectedImages(updated);
      onImageSelect(updated);
      setUrlInput('');
    }
  };

  const handleImageRemove = (index) => {
    const updated = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updated);
    onImageSelect(updated);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Paste image URL here..."
          className="border p-2 flex-1"
        />
        <button
          type="button"
          onClick={handleAddUrl}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {selectedImages && (
        <div className="flex flex-wrap gap-4">
          {selectedImages.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
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
