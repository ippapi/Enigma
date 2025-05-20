import { useState } from 'react';
import { Heart, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product, onAddToCart }) {
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const imageSrc =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : '/default-product.jpg';

  const isOutOfStock = product.stock === 0;

  const increment = () => setQuantity(q => Math.min(q + 1, product.stock || 99));
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div
      className="text-white rounded-2xl w-auto shadow-xl relative overflow-hidden ml-4 mr-4"
      style={{
        backgroundImage: 'linear-gradient(150deg, #554080, #7C58C4, #7056A4)'
      }}
    >
      {/* Icon mở rộng */}
      <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
        <svg 
          className="w-3 h-3 text-white transform -rotate-30" 
          fill="currentColor" 
          viewBox="0 0 24 24"
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
      <div className="overflow-hidden">
        <img
          src={imageSrc}
          alt={product.name}
          className="mx-auto h-35 object-contain mt-2 mb-2 drop-shadow-lg p-2 transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="mt-4 bg-gradient-to-r from-[#443364] to-[#675688] rounded-b-2xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold text-base truncate">{product.name}</h3>
          <button 
            onClick={() => router.push(`/shop/${product._id}`)}
            className="text-white text-sm hover:underline"
          >
            Xem chi tiết
          </button>
        </div>
        <p className="text-white font-bold text-lg">{product.price} VND</p>

        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-white text-xs font-semibold px-2 py-1 rounded-full ${
              isOutOfStock ? 'bg-gray-500' : 'bg-pink-600'
            }`}
          >
            {isOutOfStock ? 'Hết hàng' : 'Best Seller'}
          </span>
          <span className="text-white/80 text-xs text-right truncate">
            {product.stock !== 0 ? `${product.stock} sản phẩm` : '1K+ đã bán'}
          </span>
        </div>

        {/* Bộ chọn số lượng */}
        {!isOutOfStock && (
          <div className="flex items-center justify-between bg-white/10 rounded-md p-1">
            <button
              onClick={decrement}
              className="p-1 rounded hover:bg-white/20 transition"
            >
              <Minus className="w-4 h-4 text-white" />
            </button>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={quantity}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, '');
                const num = parseInt(raw, 10);
                if (!isNaN(num)) {
                  setQuantity(Math.max(1, Math.min(num, product.stock || 99)));
                } else {
                  setQuantity(0);
                }
              }}
              className="w-10 text-center bg-transparent text-white text-sm outline-none"
            />
            <button
              onClick={increment}
              className="p-1 rounded hover:bg-white/20 transition"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {/* Nút thêm vào giỏ */}
        <button
          onClick={() => !isOutOfStock && onAddToCart(product._id, quantity)}
          disabled={isOutOfStock}
          className={`w-full py-2 rounded-md text-sm font-medium text-white transition ${
            isOutOfStock
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600'
          }`}
        >
          {isOutOfStock ? 'Hết hàng rồi công chúa ơi' : 'Thêm vào giỏ'}
        </button>
      </div>
    </div>
  );
}
