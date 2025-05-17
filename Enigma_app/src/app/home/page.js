"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AnimatedWave3 from '@/components/wave/AnimatedWave3';
import Scene from "@/components/threejs/threeModelViewer";

export default function Home() {
  const [number] = useState(3); // Fixed number
  const [card, setCard] = useState(null);

  const fetchCard = async () => {
    console.log("Fetching card...");
    try {
      const response = await fetch(`/api/tarotCard/${number}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setCard(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#2f1541] to-[#0b0c2a] text-white font-sans">

      {/* Hero Section */}
      <section className="relative text-center py-20 bg-[url('/images/Home/Background.png')] bg-cover bg-center bg-no-repeat">
        <div>
          <Scene />
        </div>
        <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-10 px-6">
          <div className="max-w-xl text-left">
            <h2
              className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-left"
              style={{
                backgroundImage: 'linear-gradient(-30deg, #00A1C7, #F5559E, #ED7D0C)',
                fontFamily: 'Anton, sans-serif',
              }}
            >
              OUR STORY
            </h2>
            <p className="mb-4">Life is wonderful, love is Tarot Enigma</p>
            <p className="text-sm mb-6">
              Tarot Enigma is an online platform that combines booking, buying, and chatting with professional Tarot readers...
            </p>
            <div className="flex gap-4">
              <button className="bg-pink-500 text-white px-4 py-2 rounded">GET STARTED</button>
              <button className="text-white underline">LEARN MORE</button>
            </div>
          </div>
          <img
            src="images/Home/Our Story.png"
            alt="Pink Panther"
            className="w-[500px] h-[500px] object-contain mt-[50px]"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0F172A] to-transparent z-0" />
      </section>

      {/* Pink Panther Section */}
      <section className="bg-[#0F172A] py-10 px-6 text-sm flex gap-6 items-center text-white">
        <img src="images/Home/Pink Panther.jpg" alt="Panther Avatar" width={220} height={220} className="rounded-full ml-12 mr-8" />
        <div>
          <h3 className="font-bold text-lg">Pink Panther</h3>
          <p>
            At Tarot Enigma, Tarot expert Pink Panther will provide free Tarot readings...
          </p>
        </div>
      </section>

      <div className="relative">
        <AnimatedWave3 />
      </div>

      {/* Mission */}
      <section className="bg-purple-900 px-6 py-20 pl-16 text-white">
        <h2 className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-left"
          style={{
            backgroundImage: 'linear-gradient(-30deg, #00A1C7, #F5559E, #ED7D0C)',
            fontFamily: 'Anton, sans-serif',
          }}>
          MISSION
        </h2>
        <p className="mb-4">Connecting the Tarot Community</p>
        <p className="text-sm mb-6">
          Tarot Enigma allows customers to search for and chat with reputable Tarot readers...
        </p>
        <Image src="/images/Home/Mission.png" alt="Planet" width={600} height={300} />
      </section>

      {/* Tarot Reading */}
      <section className="flex flex-col px-6 py-20 text-left pl-16 text-white bg-[url('/images/Home/Background.png')] min-h-screen">
        <div>
          <h2
            className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-left"
            style={{
              backgroundImage: 'linear-gradient(-30deg, #00A1C7, #F5559E, #ED7D0C)',
              fontFamily: 'Anton, sans-serif',
            }}
          >
            TAROT READING
          </h2>
          <p className="mb-4">Random messages</p>
          <p className="text-sm mb-6">
            Pick a card, and Pink Panther will reveal a random message from the universe just for you!
          </p>
          <button className="bg-pink-500 text-white px-4 py-2 rounded mb-10">ASK PINK PANTHER</button>
        </div>
        <div className="flex flex-1 flex-col md:flex-row items-start gap-10">
          <div className="flex-1 pt-[50px]">
            <p className="mb-4">Bỏ mí lá bài lật lật trang Tarot dô đây</p>
          </div>
          <div className="flex-1 flex items-end justify-center">
            <img src="/images/Home/Tarot reading.png" alt="Pink Panther" className="w-full max-w-sm" />
          </div>
        </div>
      </section>
    </div>
  );
}
