"use client";

import { useState, useEffect } from "react";
import { Minus, Plus } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from 'lucide-react';

const ProductPage = () => {
  const { product_id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/product/${product_id}`)
      .then((res) => res.json())
      .then((data) => {setProduct(data.product); setPreviewImage(data.product.images?.[0] || '/default-product.jpg');});
  }, [product_id]);

  const isOutOfStock = product.stock === 0;

  const increment = () => setQuantity(q => Math.min(q + 1, product.stock || 99));
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = async (productId, quantity) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ productId, quantity }),
    });

    const result = await res.json();
    if (res.ok && result.quantity !== 0) {
      alert('Added to cart!');
    } else if (res.ok && result.quantity === 0) {
      alert('Oh uh! out of stock!');
    } else if (res.status === 403) {
      router.push('/auth');
    } else {
      alert(`Error: ${result.message || result.error}`);
    }
  };

  return (
    <main className="flex-1 py-8 px-8 me-4 mt-20 text-gray-100 rounded-2xl shadow-xl min-h-[500px] max-h-[800px] overflow-hidden">
      <button
        onClick={() => router.back()}
        className="py-2 px-2 flex items-center gap-2 text-white hover:text-pink-400 transition mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-lg font-medium">Quay lại</span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full mt-1">
        {/* Right => Left: Product Info */}
        <div className="flex flex-col justify-between h-full overflow-hidden ml-4">
          <div className="space-y-8 overflow-y-auto pr-3 max-h-[620px] scrollbar-thin scrollbar-thumb-purple-600/60 scrollbar-track-transparent">
            <div style={{ backgroundColor: 'rgba(254, 247, 255, 0.3)' }} className="backdrop-blur-md rounded-tr-[100px] rounded-br-[100px] px-10 py-6 w-full max-w-full shadow-lg text-white space-y-6">
              {/* Best Seller Badge */}
              <span
                className="inline-block text-black text-xs font-semibold px-3 py-1 rounded-full shadow"
                style={{
                  background: 'linear-gradient(-48deg, #FFFFFF, #F5559E, #00A1C7)',
                }}
              >
                Best Seller
              </span>
              {/* Product Name */}
              <h1 style={{ fontFamily: 'Anton, sans-serif', fontWeight: 'bold' }} className="text-4xl tracking-tight mt-4">
                {product.name}
              </h1>
              {/* Price */}
              <p className="text-2xl font-semibold">{product.price} VND</p>
            </div>

            <p className="text-base text-gray-300 leading-relaxed whitespace-pre-line mt-4 text-justify">{product.description}</p>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-lg bg-pink-600/80 px-3 py-1 rounded-full shadow-md">
                {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
              </span>
              <span className="text-lg text-white/70">
                {product.stock > 0 ? `${product.stock} sản phẩm` : '1K+ đã bán'}
              </span>
            </div>
  
            {!isOutOfStock && (
              <div className="flex items-center bg-white/10 rounded-lg p-1 w-fit mt-4">
                <button
                  onClick={decrement}
                  className="px-3 py-1 hover:bg-white/20 rounded-l-lg transition"
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
                    }
                  }}
                  className="w-12 text-center bg-transparent text-white text-sm outline-none"
                />
                <button
                  onClick={increment}
                  className="px-3 py-1 hover:bg-white/20 rounded-r-lg transition"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
  
          <button
            onClick={() => !isOutOfStock && handleAddToCart(product._id, quantity)}
            disabled={isOutOfStock}
            className={`w-full py-3 mt-6 rounded-xl text-lg font-medium text-white transition-all duration-200 shadow-md ${
              isOutOfStock
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400'
            }`}
          >
            {isOutOfStock ? 'Hết hàng rồi công chúa ơi' : 'Thêm vào giỏ hàng'}
          </button>
        </div>
        {/* Left: Product Image*/}
        <div className="flex flex-col items-center h-full overflow-hidden">
          <div className="flex justify-center items-center w-full h-[400px] bg-black/20 rounded-2xl shadow-inner p-4">
            <img
              src={previewImage}
              alt={product.name}
              className="rounded-xl max-h-full max-w-full object-contain shadow-2xl border border-purple-400/30 transition duration-300"
            />
          </div>
  
          <div className="flex gap-2 mt-4 overflow-x-auto max-w-full pb-1">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Preview ${idx + 1}`}
                onClick={() => setPreviewImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 shadow-sm ${
                  img === previewImage
                    ? 'border-pink-500 scale-105'
                    : 'border-transparent hover:border-purple-400'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </main>
  );  
}

export default ProductPage;
