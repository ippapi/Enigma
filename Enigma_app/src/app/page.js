"use client"; 

import { useState, useEffect } from "react";
import Scene from "@/components/threejs/threeModelViewer";
import AnimatedWave3 from "@/components/wave/AnimatedWave3";
import Image from "next/image";

export default function Home() {
    return (
        <div className="bg-gradient-to-b from-[#2f1541] to-[#0b0c2a] text-white font-sans">
    
          {/* Hero Section */}
          <section className="relative text-center py-20 bg-[url('/images/Home/Background.png')] bg-cover bg-center bg-no-repeat">
            {/* <div>
              <Scene />
            </div> */}
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
                  <a href="/shop">
                    <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300">
                      GET STARTED
                    </button>
                  </a>
                  <button className="text-white underline hover:text-pink-300 transition duration-300">
                    LEARN MORE
                  </button>
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
          <section className="bg-[#581C87] px-6 py-24 text-white relative overflow-hidden lamff">
            <div className="max-w-6xl mx-auto relative z-10 px-4">
              <h2
                className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter"
                style={{
                  backgroundImage: 'linear-gradient(-30deg, #00A1C7, #F5559E, #ED7D0C)',
                  fontFamily: 'Anton, sans-serif',
                }}
              >
                OUR MISSION
              </h2>

              <p className="mb-4">Bridging Ancient Wisdom with Modern Seekers</p>
              <p className="text-sm mb-6">
                At Tarot Enigma, we're dedicated to creating a sacred space where intuition meets technology. 
                Our platform connects seekers with vetted, experienced Tarot readers who can provide genuine 
                guidance through life's mysteries.
              </p>

              <div className="flex items-stretch gap-8 flex-wrap md:flex-nowrap">
                <div className="w-full md:w-[40%] bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-3 text-purple-200">Why Choose Us</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">✦</span>
                      <span>Authentic, ethical readers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">✦</span>
                      <span>Secure, confidential sessions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">✦</span>
                      <span>Personalized guidance</span>
                    </li>
                  </ul>
                </div>

                <div className="w-full md:w-[60%] relative flex items-center justify-center">
                  <Image 
                    src="/images/Home/Tarot reading.png" 
                    alt="Tarot cards and mystical symbols" 
                    width={300} 
                    height={200}
                    className="rounded-xl object-contain transform hover:scale-105 transition-transform duration-300"
                    style={{
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-700 rounded-full mix-blend-screen opacity-20 filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-700 rounded-full mix-blend-screen opacity-15 filter blur-3xl"></div>
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
                <a href="/tarot">
                  <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300">
                    ASK PINK PANTHER
                  </button>
                </a>
            </div>
            <div>
              <Scene />
            </div>
          </section>
        </div>
      );
}
