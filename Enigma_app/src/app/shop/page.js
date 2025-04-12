'use client';  // Đảm bảo đây là dòng đầu tiên

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/shop/productCard';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/product?page=${page}&limit=6`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, [page]);

const handleAddToCart = async (productId) => {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ productId, quantity: 1 }),
  });

  const result = await res.json();
  if (res.ok) {
    alert('Added to cart!');
  } else if (res.status === 403) {
    router.route('/auth');
  } else {
    alert(`Error: ${result.message || result.error}`);
  }
};

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Best Seller Tarot Decks</h1>

      <h2 className="text-xl font-semibold">Suggested For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-4 py-2 bg-gray-200 rounded">Prev</button>
        <button onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-gray-200 rounded">Next</button>
      </div>
    </div>
  )
}
