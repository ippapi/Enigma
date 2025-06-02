'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import AnimatedWave2 from '../../components/wave/AnimatedWave2';
import ProductCard from '@/components/shop/productCard';

export default function TarotBookingPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/product?page=${page}&limit=6`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, [page]);

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
    <div style={{ backgroundColor: '#38255E', color: 'white', borderRadius: '8px' }}>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-20 pb-0 relative z-10">
        <div className="w-full md:w-1/2 text-left space-y-4 ml-[45px]">
          <h2 className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-left"
              style={{
                backgroundImage: 'linear-gradient(-30deg, #00A1C7, #F5559E, #ED7D0C)',
                fontFamily: 'Anton, sans-serif',
              }}>
            DISCOVER, COLLECT<br />AND SELL TAROT DECKS
          </h2>

          <p className="text-lg text-gray-100 font-normal">
            The world’s largest digital marketplace for Tarot packs collection
          </p>
          <p className="text-base text-gray-300 font-thin">
            We are the world's largest and most reputable platform for buying and selling Tarot decks. <br />
            You can rest assured about the quality, authenticity, and pricing of each deck.
          </p>
          <button className="text-white px-4 py-2 rounded">BUY NOW!</button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center mt-5 relative">
          <div style={{
            width: '600px',
            height: '600px',
            backgroundImage: 'radial-gradient(circle, #B222BC 0%,rgba(178, 34, 188, 0.17) 50%, rgba(254, 180, 123, 0) 100%)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <img src="images/Tarot Shop/Pink Panther - Shop.png" alt="Pink Panther"
                 className="w-[420px] h-[420px] object-cover mt-[50px] z-0" />
          </div>
        </div>
      </div>

      <div className="relative">
        <AnimatedWave2 />
      </div>

      <div className="px-4 py-12 md:px-8 lg:px-16" style={{ backgroundColor: '#957FC1' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 text-left">
            <h2
              className="text-4xl md:text-5xl font-black mb-2 inline-block tracking-tight"
              style={{
                color: '#38255E', 
                fontFamily: 'Anton, sans-serif',
                letterSpacing: '-0.5px',
              }}
            >
              BEST SELLER TAROT DECKS
            </h2>
            <p className="text-sm md:text-base opacity-80" style={{ color: '#38255E' }}>
              Top selling tarot decks in Tarot Enigma
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 - TOP 2 */}
            <div className="bg-amber-500 rounded-xl p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1 hover:shadow-amber-400/30">
              <div className="w-full aspect-square bg-amber-100 mb-4 rounded-xl overflow-hidden">
                <img
                  src="https://dl.dropboxusercontent.com/scl/fi/krxreyh2r3zx2v2w11qct/Angel-Tarot-by-Travis-McHenry-1-removebg-preview.png?rlkey=vyrf16tpngzzxu1u1p40u7ahx&st=y4klbo8p&dl=0"
                  alt="Angel Tarot"
                  className="w-full h-full scale-80 object-contain transition-transform duration-500 hover:scale-90"
                />
              </div>
              <h3 className="font-bold text-lg text-amber-900 mb-1">TOP 2</h3>
              <p className="text-amber-800 font-medium">Angel Tarot</p>
            </div>

            {/* Card 2 - TOP 1 */}
            <div className="relative rounded-xl p-6 text-center shadow-2xl transition-all hover:-translate-y-1 transform-gpu"
              style={{
                background: 'linear-gradient(135deg, #FF6B9E 0%, #FF9A8B 100%)',
                border: '2px solid rgba(255,255,255,0.2)'
              }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-pink-600 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                BEST RATED
              </div>
              <div className="w-full aspect-square bg-pink-100 mb-4 rounded-xl overflow-hidden">
                <img
                  src="https://dl.dropboxusercontent.com/scl/fi/i69yyudzhj5vn1k9ozs6r/Azras-Golden-Lenormand-Cards-1-removebg-preview.png?rlkey=2m9olifwe4l1gpy0l2u41ymei&e=1&st=zb3g87lq&dl=0"
                  alt="Azras Golden"
                  className="w-full h-full scale-80 object-contain transition-transform duration-500 hover:scale-90"
                />
              </div>
              <h3 className="font-bold text-lg text-white mb-1">TOP 1</h3>
              <p className="text-white font-medium">Azras Golden</p>
            </div>

            {/* Card 3 - TOP 3 */}
            <div 
              className="rounded-xl p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1 hover:shadow-cyan-500/30"
              style={{ backgroundColor: '#CD845F' }}
            >
              <div className="w-full aspect-square bg-amber-100 mb-4 rounded-xl overflow-hidden">
                <img
                  src="https://dl.dropboxusercontent.com/scl/fi/nbe8r90dhjehxfr4dz6zt/Cosmic-Law-Chinese-Oracle-Deluxe-Edition-1-removebg-preview.png?rlkey=irn7nipvkkm9w8sycisai91k2&st=9537x7x1&dl=0"
                  alt="Comic Law"
                  className="w-full h-full scale-80 object-contain transition-transform duration-500 hover:scale-90"
                />
              </div>
              <h3 className="font-bold text-lg text-white mb-1">TOP 3</h3>
              <p className="text-cyan-50 font-medium">Comic Law</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Section */}
      <div className="px-8 py-12" style={{
        backgroundImage: 'url("/images/Home/Background.png")',
        backgroundSize: 'cover',
      }}>
        <h2 className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-right ml-10"
            style={{
              backgroundImage: 'linear-gradient(150deg, #00A1C7, #F5559E, rgb(241, 197, 154))',
              fontFamily: 'Anton, sans-serif',
            }}>
          SUGGESTED FOR YOU
        </h2>
        <div className="p-6 space-y-6 ml-10 mr-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-4 py-2 bg-gray-200 rounded text-black hover:bg-black hover:text-white transition"
            >
              Prev
            </button>

            <button
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 bg-gray-200 rounded text-black hover:bg-black hover:text-white transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
