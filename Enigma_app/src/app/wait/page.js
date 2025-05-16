'use client';

import React, { useState } from 'react';
import Header from '../../components/navBar';
// import Footer from '../../components/footer';

export default function ReaderRegisterWait() {
  const [activeTab, setActiveTab] = useState('register');

  return (
    <div className="min-h-screen bg-[#161527] text-white">
      {/* <Header /> */}

      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-center py-20 text-center relative"
        style={{
          backgroundImage: 'url("/images/Home/Background1.png")',
          backgroundSize: 'cover',
        }}
      >
        <h2
          className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-center md:text-left"
          style={{
            backgroundImage: 'linear-gradient(150deg, #00A1C7, #F5559E, rgb(241, 197, 154))',
            fontFamily: 'Anton, sans-serif',
          }}
        >
          READER REGISTER
        </h2>

        {/* Content Card */}
        <div className="px-6 md:px-16 pt-10">
            <div className="bg-[rgba(15,23,42,0.71)] rounded-xl px-14 py-10 shadow-xl max-w-6xl mx-auto">
            {/* Register Tab */}
                {activeTab === 'register' && (
                <div className="flex flex-col ml-8 gap-8">
                    {/* Image 1 and Title 1 */}
                    <div className="flex items-center ml-24 gap-8">
                        <img src="/images/Register Reader/Checkcircle.png" alt="Success Icon" className="w-16 h-16" />
                        <h3 className="text-2xl ml-8">Successfully sent Reader request to the system!</h3>
                    </div>
                    {/* Image 2 and Title 2 */}
                    <div className="flex items-center ml-24 gap-8">
                        <img src="/images/Register Reader/Loader.png" alt="Pending Icon" className="w-16 h-16" />
                        <h3 className="text-2xl ml-8">Waiting for notification and approval from the system.</h3>
                    </div>
                    <button className="bg-[#581C87] mx-auto h-14 w-[450px] text-white p-2 rounded-[100px] hover:bg-pink-500 hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 mb-4 font-extrabold text-2xl">            
                        CANCEL READER REQUEST
                    </button>
                </div>
                )}
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#161936] to-transparent z-10" />
      </div>

      {/* <Footer /> */}
    </div>
  );
}
