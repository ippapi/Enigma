'use client';

import React, { useState } from 'react';
import Header from '../../components/navBar';
// import Footer from '../../components/footer';
import { useRouter } from "next/navigation";

export default function ReaderRegisterPage() {
  const [formData, setFormData] = useState({
    yearsReading: '',
    tarotDecks: '',
    hourlyRate: '',
    thoughts: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleSendRequest = () => {
    // Chuyển trang sang ReaderRegisterWait
    router.push("/wait"); 
  };
  return (
    <div className="min-h-screen bg-[#161527] text-white">
      <Header />

      <div
        className="w-full bg-cover bg-center py-20 text-center relative"
        style={{
          backgroundImage: 'url("/images/Home/Background1.png")',
          backgroundSize: 'cover',
        }}
      >
        <h2
          className="text-4xl font-black bg-clip-text text-transparent mb-2 inline-block tracking-tighter text-center md:text-left"
          style={{
            backgroundImage: 'linear-gradient(150deg, #00A1C7, #F5559E, rgb(241, 197, 154))',
            fontFamily: 'Anton, sans-serif',
          }}
        >
          READER REGISTER
        </h2>
        <p className="mb-6">Answer the questions below</p>
        <div className="space-y-10 max-w-8xl mx-auto px-6 md:px-15 rounded-xl padding-top: 2.5rem text-left">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto ">
            <div className="border-t border-white">
              <h4 className="font-bold mt-4 mb-4 text-xl">How long have you been reading Tarot?</h4>
              <input
                type="text"
                name="yearsReading"
                placeholder="Number of years*"
                value={formData.yearsReading}
                onChange={handleInputChange}
                className="w-full h-14 p-8 border-b-2 border-[#B9B9B9] bg-[#9962D6] text-white placeholder-[#B9B9B9]"
                style={{ backgroundColor: 'rgba(153, 98, 214, 0.45)' }}
              />
            </div>
            <div className="border-t border-white">
              <h4 className="font-bold mt-4 mb-4 text-xl">What types of Tarot decks can you read?</h4>
              <input
                type="text"
                name="tarotDecks"
                placeholder="Type of Tarot decks*"
                value={formData.tarotDecks}
                onChange={handleInputChange}
                className="w-full h-14 p-8 border-b-2 border-[#B9B9B9] bg-[#9962D6] text-white placeholder-[#B9B9B9]"
                style={{ backgroundColor: 'rgba(153, 98, 214, 0.45)' }}              
              />
            </div>
            <div className="border-t border-white">
              <h4 className="font-bold mt-4 mb-4 text-xl">How much do you want to charge per hour for a reading?</h4>
              <input
                type="text"
                name="hourlyRate"
                placeholder="Amount*"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                className="w-full h-14 p-8 border-b-2 border-[#B9B9B9] bg-[#9962D6] text-white placeholder-[#B9B9B9]"
                style={{ backgroundColor: 'rgba(153, 98, 214, 0.45)' }}              
              />
            </div>
            <div className="border-t border-white">
              <h4 className="font-bold mt-4 mb-4 text-xl">
                Please share your thoughts on the Tarot Enigma website and why you want to become a reader.
              </h4>
              <textarea
                name="thoughts"
                placeholder="Enter your thoughts*"
                value={formData.thoughts}
                onChange={handleInputChange}
                className="w-full h-16 p-5 border-b-2 border-[#B9B9B9] bg-[#9962D6] text-white placeholder-[#B9B9B9]"
                style={{ backgroundColor: 'rgba(153, 98, 214, 0.45)' ,paddingLeft: '2rem' }}              
              ></textarea>
            </div>
          </form>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#161936] to-transparent z-10" />
      </div>

      <div className="relative z-0">
        <div className="relative bg-[#1e1c38] px-6 md:px-16 py-6 z-0">
        <div className="flex justify-center">
          <h2
              className="text-center text-4xl font-black bg-clip-text text-transparent mb-10 inline-block tracking-tighter mt-10"
              style={{
                backgroundImage: 'linear-gradient(150deg, #00A1C7, #F5559E, rgb(241, 197, 154))',
                fontFamily: 'Anton, sans-serif',
              }}
            >
              TERMS OF BECOMING A READER
          </h2>
        </div>

          <div className="space-y-6 max-w-6xl mx-auto mt-6">
            <div className="border-t border-white"> 
              <h4 className="font-bold mt-6 mb-4 text-xl">Who can become a Reader?</h4>
              <p className="mt-2 text-[#B9B9B9]">
              Become part of our vibrant Tarot Enigma community.
              </p>
              <p className="mt-2 text-[#B9B9B9]">
              Anyone passionate about Tarot, with experience in readings, and committed to ethical practice, can apply to become a reader on Tarot Enigma.
              </p>
            </div>

            <div className="border-t border-white">
              <h4 className="font-bold mt-6 mb-4 text-xl">
              How to apply to become a Reader?
              </h4>
              <p className="mt-2 text-[#B9B9B9]">
              Start your journey with Tarot Enigma today.
              </p>
              <p className="mt-2 text-[#B9B9B9]">
              Fill out the Reader Application Form on our website. After reviewing your information, our team will guide you through the next steps.
              </p>
            </div>

            <div className="border-t border-white">
              <h4 className="font-bold mt-6 mb-4 text-xl">
              Terms and Commitments for Readers:
              </h4>
              <ol className="list-decimal list-inside mt-2 text-[#B9B9B9]">
                <li className="mt-2">Always provide honest and genuine Tarot readings.</li>
                <li className="mt-2">Maintain professionalism and respect with all clients.</li>
                <li className="mt-2">Protect client confidentiality at all times.</li>
                <li className="mt-2">Follow Tarot Enigma's community standards and ethical guidelines.</li>
                <li className="mt-2">Respond to bookings punctually and professionally.</li>
              </ol>
            </div>
            
            <div className="px-6 md:px-16 py-2">
              <div className="flex flex-col items-center space-y-6 mt-6 mb-8">
                <div className="flex items-center mr-8 mb-3">
                  <input
                    type="checkbox"
                    id="agree-terms"
                    className="w-10 h-10 mr-8 accent-[#581C87] border-2 border-white rounded focus:ring-2"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="agree-terms" className="text-white font-semibold">
                    I agree to the terms of becoming a <span className="font-black">Tarot Reader</span>.
                  </label>
                </div>
                <button
                  onClick={handleSendRequest}
                  className={`bg-[#581C87] h-14 ml-10 w-[380px] text-white p-2 rounded-[100px] font-extrabold text-xl 
                    hover:bg-pink-500 hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-8 mb-2
                    ${!agreed ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                  disabled={!agreed}
                >
                  SEND READER REQUEST
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
