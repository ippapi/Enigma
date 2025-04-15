'use client';

import React, { useState } from 'react';
import Header from '../../components/navBar';
import Footer from '../../components/footer';

export default function ContactUsPage() {
  const [activeTab, setActiveTab] = useState('sales');

  return (
    <div className="min-h-screen bg-[#161527] text-white">
      <Header />

      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-center py-20 text-center relative"
        style={{
          backgroundImage: 'url("/images/Home/Background.png")',
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
          CONTACT US
        </h2>

        {/* Tabs */}
        <div className="px-6 md:px-16 py-10">
          <div className="flex justify-center space-x-12 mb-10">
            {['sales', 'billing', 'company'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded font-semibold transition-colors duration-300 ${
                  activeTab === tab ? 'bg-pink-500 text-white' : 'bg-[#2b2944] text-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'sales'
                  ? 'Sales Support'
                  : tab === 'billing'
                  ? 'Product & Billing Support'
                  : 'Company Information'}
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div className="bg-[#1e1c38] rounded-xl px-14 py-10 shadow-xl mb-12 max-w-screen-lg mx-auto">
            <div
              className={`grid gap-6 ${
                activeTab ===  'grid-cols-1 md:grid-cols-2' 
              }`}
            >
              {/* SALES TAB */}
              {activeTab === 'sales' && (
                <div className="flex flex-col md:flex-row gap-6 w-full md:col-span-2">
                  <div className="flex-1 md:flex-[1_1_33%] bg-[#2b2944] p-6 rounded-lg flex flex-col justify-between border border-white">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Chat with Sales</h2>
                      <p className="mb-4">
                        Do you need answers about pricing, features, support plans, or consulting
                        services? Chat with one of our specialists now.
                      </p>
                    </div>
                    <button className="bg-pink-500 px-4 py-2 rounded w-fit mt-auto">Chat Now</button>
                  </div>

                  <div className="flex-1 md:flex-[1_1_66%] flex flex-col justify-between">
                    <h2 className="text-xl font-bold mb-4">Submit an Inquiry</h2>
                    <p className="mb-4">
                      Complete the form below, and a member of our sales team will contact you as
                      soon as possible.
                    </p>
                    <form className="space-y-4">
                      <input
                        type="email"
                        placeholder="Email*"
                        className="w-full p-3 border-b-2 border-white bg-[#55397E] text-white"
                      />
                      <div className="flex flex-col md:flex-row gap-4">
                        <input
                          type="text"
                          placeholder="First Name*"
                          className="w-full md:w-1/2 p-3 border-b-2 border-white bg-[#55397E] text-white"
                        />
                        <input
                          type="text"
                          placeholder="Last Name*"
                          className="w-full md:w-1/2 p-3 border-b-2 border-white bg-[#55397E] text-white"
                        />
                      </div>
                      <textarea
                        placeholder="Tell us about how we can help*"
                        className="w-full p-3 border-b-2 border-white bg-[#55397E] text-white"
                      ></textarea>
                      <button type="submit" className="bg-pink-500 px-6 py-2 rounded">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* BILLING TAB */}
              {activeTab === 'billing' && (
                <div className="flex flex-col md:flex-row gap-6 w-full md:col-span-2 items-stretch">
                  <div className="flex-1 md:flex-[1_1_33%] bg-[#2b2944] p-6 rounded-lg flex flex-col justify-between border border-white">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Talk to Support</h2>
                      <p className="mb-4">
                        Having trouble logging in? Looking to report a bug? Our support engineers are here to help.
                      </p>
                    </div>
                    <button className="bg-pink-500 px-4 py-2 rounded w-fit mt-auto">Chat Now</button>
                  </div>

                  <div className="flex-1 md:flex-[1_1_66%] flex flex-col justify-between h-full">
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                      {[
                        { title: 'Vietnam Office', text: 'Our Vietnamese headquarters are located in Ho Chi Minh City, focusing on R&D and local support.' },
                        { title: 'Korea HQ', text: 'The Seoul office serves as our international headquarters and manages global operations.' },
                        { title: 'Support Portal', text: 'Access documentation, submit tickets, and get help through our dedicated portal.' },
                        { title: 'Press & Media', text: 'For media inquiries, branding assets, and press releases, please contact our PR team.' },
                      ].map((item, index) => (
                        <div key={index} className="bg-[#161936] p-6 rounded-lg border border-white flex flex-col justify-between">
                          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                          <p>{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* COMPANY TAB */}
              {activeTab === 'company' && (
                <div className="flex flex-col md:flex-row gap-6 w-full md:col-span-2 items-stretch">
                  <div className="flex-1 md:flex-[1_1_33%] bg-[#2b2944] p-6 rounded-lg flex flex-col justify-between border border-white">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Company</h2>
                      <p className="mb-4">
                        MongoDB empowers innovators to create, transform, and disrupt industries by unleashing the power of software and data.
                      </p>
                    </div>
                    <button className="bg-pink-500 px-4 py-2 rounded w-fit mt-auto">Learn More</button>
                  </div>

                  <div className="flex-1 md:flex-[1_1_66%] flex flex-col justify-between">
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                      {[
                        { title: 'Vietnam Office', text: 'Our Vietnamese headquarters are located in Ho Chi Minh City, focusing on R&D and local support.' },
                        { title: 'Korea HQ', text: 'The Seoul office serves as our international headquarters and manages global operations.' },
                        { title: 'Support Portal', text: 'Access documentation, submit tickets, and get help through our dedicated portal.' },
                        { title: 'Press & Media', text: 'For media inquiries, branding assets, and press releases, please contact our PR team.' },
                      ].map((item, index) => (
                        <div key={index} className="bg-[#161936] p-6 rounded-lg border border-white flex flex-col justify-between">
                          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                          <p>{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#161936] to-transparent z-10" />
      </div>

      {/* FAQ Section */}
      <div className="relative z-0">
        <div className="relative bg-[#1e1c38] px-6 md:px-16 py-16 z-0">
        <div className="flex justify-center">
          <h2
              className="text-center text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter"
              style={{
                backgroundImage: 'linear-gradient(150deg, #00A1C7, #F5559E, rgb(241, 197, 154))',
                fontFamily: 'Anton, sans-serif',
              }}
            >
              FREQUENTLY ASKED QUESTIONS
            </h2>
        </div>
          <p className="text-center mb-8">
            Check out some of our most frequently asked questions.
          </p>

          <div className="space-y-6 max-w-5xl mx-auto">

            <div className="border-t border-white p-3"> 
              <h4 className="font-bold mt-4 mb-4 text-xl">I need to reset my password.</h4>
              <p>
                To reset your password, enter your username and click RESET PASSWORD via the link below.
              </p>
              <p className="text-blue-400">
                https://tarotenigma.com/user#//etoet/reset/password
              </p>
              <p>
                Once you submit this, you will receive an email with instructions on how to complete the process.
              </p>
            </div>

            <div className="border-t border-white p-3">
              <h4 className="font-bold mt-4 mb-4 text-xl">Forgot your Tarot Enigma account email address?</h4>
              <p>
              If you enter a wrong email address, you might get the error "We couldn't find an account with that 
              email address." If that happens, select Get help signing in, a new window will open, here, select
               Find your account. Then, follow the onscreen instructions to recover your email address.
              </p>
            </div>

            <div className="border-t border-white p-3">
              <h4 className="font-bold mt-4 mb-4 text-xl">How can I book a Tarot reader?</h4>
              <p>
                Visit our booking section to select a reader, choose your time, and follow the instructions.
              </p>
              <p className="text-blue-400">https://tarotenigma.com/book-a-reader</p>
              <p>You’ll receive a confirmation email with all the details.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
