import React from "react";
import Image from "next/image";
import Header from "../../components/navBar";
import Footer from "../../components/footer";
import AnimatedWave3 from '../../components/wave/AnimatedWave3';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#2f1541] to-[#0b0c2a] text-white font-sans">
        <Header/>

      {/* Hero Section */}
        <section className="relative text-center py-20 bg-[url('/images/Home/Background.png')] bg-cover bg-center bg-no-repeat">
        <h1 className="text-2xl tracking-widest">BỎ MÍ LÁ BÀI XOAY XOAY VÔ ĐÂY</h1>
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
                Tarot Enigma is an online platform that combines booking, buying, and chatting with professional Tarot readers. With a user-friendly interface, the system allows users to easily search for readers, schedule Tarot sessions, and interact with them in real time.
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

        {/* Gradient dưới section */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0F172A] to-transparent z-0" />
        </section>

      {/* Pink Panther Section */}
        <section className="bg-[#0F172A] py-10 px-6 text-sm flex gap-6 items-center text-white">
        <img src="images/Home/Pink Panther.jpg" alt="Panther Avatar" width={220} height={220} className="rounded-full ml-12 mr-8" />
        <div>
            <h3 className="font-bold text-lg">Pink Panther</h3>
            <p>
            At Tarot Enigma, Tarot expert Pink Panther will provide free Tarot readings (love questions, yes/no questions, career-related <br/>questions, etc.), astrology chart readings, and numerology analyses!
            </p>
        </div>
        </section>

        <AnimatedWave3/>
      {/* Mission */}
      <section className="bg-purple-900 px-6 py-16 text-white">
      <h2 className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-left"
            style={{
            backgroundImage: 'linear-gradient(-30deg, #00A1C7, #F5559E, #ED7D0C)',
            fontFamily: 'Anton, sans-serif',
            }}>
            MISSION
        </h2>
        <p className="text-sm max-w-2xl mb-6">
          Tarot Enigma allows customers to search for and chat with reputable Tarot readers who have years of experience in the field. More importantly, we provide a platform where everyone can easily book sessions and shop with confidence, without worrying about pricing or quality.
        </p>
        <Image src="/mission-planet.png" alt="Planet" width={600} height={300} className="mx-auto" />
      </section>

      {/* Tarot Reading */}
      <section className="px-6 py-20 text-center text-white">
      <h2 className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-left"
            style={{
            backgroundImage: 'linear-gradient(-30deg, #00A1C7, #F5559E, #ED7D0C)',
            fontFamily: 'Anton, sans-serif',
            }}>
            TAROT READING
        </h2>
        <p className="text-sm mb-4">Pick a card, and Pink Panther will reveal a random message from the universe just for you!</p>
        <button className="bg-pink-500 text-white px-4 py-2 rounded">ASK PINK PANTHER</button>
      </section>

      <Footer/>
    </div>
  );
}
