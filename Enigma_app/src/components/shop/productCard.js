import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const [isLiked, setIsLiked] = useState(false);
  const imageSrc =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : '/default-product.jpg';

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-gradient-to-b from-[#7a34e0] to-[#9f5de2] text-white rounded-2xl p-6 w-[250px] shadow-xl relative overflow-hidden">
      {/* Icon mở rộng */}
      <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
        <svg 
          className="w-3 h-3 text-white transform -rotate-30" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          style={{ transform: 'rotate(-30deg)' }}
        >
          <path d="M14 3l-1.41 1.41L18.17 10H4v2h14.17l-5.58 5.59L14 19l8-8z" />
        </svg>
      </div>

      {/* Nút like */}
      <button 
        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
        onClick={() => setIsLiked(!isLiked)}
      >
        <Heart 
          className="w-5 h-5"
          fill={isLiked ? "#ef4444" : "white"}
          stroke={isLiked ? "#ef4444" : "#7c3aed"}
          strokeWidth={1.5}
        />
      </button>

      {/* Ảnh sản phẩm */}
      <img
        src={imageSrc}
        alt={product.name}
        className="mx-auto h-48 object-contain mt-6 mb-4 drop-shadow-lg p-4 mb-20"
      />

      {/* Thông tin sản phẩm */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
        <h3 className="text-white font-semibold text-base line-clamp-1">{product.name}</h3>
        <p className="text-white font-bold text-lg mt-1">{product.price} VND</p>
        
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className={`text-white text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
            isOutOfStock ? 'bg-gray-500' : 'bg-pink-600'
          }`}>
            {isOutOfStock ? 'Hết hàng' : 'Best Seller'}
          </span>
          <span className="text-white/80 text-xs text-right truncate">
            {product.stock !== 0 ? `${product.stock} sản phẩm` : '1K+ đã bán'}
          </span>
        </div>

        {/* Nút thêm vào giỏ hàng */}
        <button
          onClick={() => !isOutOfStock && onAddToCart(product._id)}
          disabled={isOutOfStock}
          className={`mt-3 w-full py-2 rounded-md text-white transition ${
            isOutOfStock
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-400 hover:bg-purple-500'
          }`}
        >
          {isOutOfStock ? 'Hết hàng rồi công chúa ơi' : 'Thêm vào giỏ'}
        </button>
      </div>
    </div>
  );
}