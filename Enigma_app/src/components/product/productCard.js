import React from 'react';

const ProductCard = ({ product }) => {
  const { name, description, price, stock, images } = product;

  return (
    <div className="border p-4 rounded-md shadow-lg w-60">
      <div className="flex justify-center mb-4">
        {images && images.length > 0 ? (
          <img
            src={images[0]} // Show the first image (Base64 string)
            alt={name}
            className="w-full h-48 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xl font-bold">${price}</span>
        <span className="text-sm text-gray-400">In stock: {stock}</span>
      </div>
    </div>
  );
};

export default ProductCard;
