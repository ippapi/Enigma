'use client';

import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#161527] text-white">
      <div className="bg-black text-white p-7">
      </div>
      <div
        className="w-full bg-cover bg-center py-20 text-center pt-6"
        style={{
          backgroundColor: 'white',
          backgroundSize: 'cover',
        }}
      >
        <h2
          className="text-4xl font-black bg-clip-text text-transparent mb-1 inline-block tracking-tighter text-center md:text-left"
          style={{
            backgroundImage: 'linear-gradient(150deg, #00A1C7, #F5559E, rgb(239, 162, 86))',
            fontFamily: 'Anton, sans-serif',
          }}
        >
          TERMS OF SERVICE
        </h2>
        <div className=" text-gray-800 text-left px-4 md:px-24 py-8 flex-grow space-y-10  mx-auto text-sm md:text-base leading-relaxed [&_p]:mb-2">          
          <section>
          <p><i>Last updated: April 25, 2025.</i></p>
          <p><i>To see what has changed in this Agreement, click here.</i></p>
          <p>
          Tarot Enigma (“we,” “us,” or “our”) is pleased to offer certain web services (“Platform Services”) according to the terms and conditions in this Agreement (“Agreement”). By creating an account to use the Platform Services, you agree to this Agreement. If you represent an organization or act on behalf of a reader or customer group, you represent and warrant that you are authorized to agree to this Agreement on their behalf. If you do not agree to this Agreement, do not use the Platform Services.
          </p>
          <h3 className="font-bold mb-2">1. Platform Services.</h3>
          <p>
          You may access and use our services, including tarot booking, digital community features, and e-commerce components (“Platform Services”), in accordance with this Agreement. We may modify or discontinue any part of the Platform Services at any time, and will notify you of any material changes via email or our website.
          </p>
          <p>
          Some services may be offered in a beta or trial phase for the purpose of gathering feedback. These are not guaranteed to be stable or error-free. Tarot Enigma is not liable for any losses resulting from the use of beta features.
          </p>
          <h3 className="font-bold mb-2">2. Registration and Your Account.</h3>
          <p>
          To use our services, you must register an account by providing accurate and up-to-date information. You are responsible for safeguarding your account credentials and are liable for all activity under your account.
          </p>
          <h3 className="font-bold mb-2">3. Reader Services and Bookings.</h3>
          <p>
          If you register as a tarot reader, you agree to provide accurate details about your services, availability, and rates. You are responsible for delivering booked services in a professional and respectful manner. We may moderate or suspend reader accounts that violate our guidelines.
          </p>
          <p>
          All services booked through Tarot Enigma are subject to confirmation, and we reserve the right to cancel or refund any session if necessary.
          </p>
          <h3 className="font-bold mb-2">4. Your Data.</h3>
          <p>
          (a) You are responsible for the content you upload, share, or submit through Tarot Enigma, including product listings, messages, or reading notes. You agree not to submit any content that is illegal, misleading, or violates any rights.
          </p>
          <p>
          (b) Privacy & Data Handling. We comply with relevant data protection laws. Details on how we collect and process data are available in our [Privacy Policy].
          </p>
          <p>
          (c) Security. We take reasonable technical and organizational measures to protect your data. However, you are responsible for securing your login credentials and device. If you suspect unauthorized access, please notify us immediately.
          </p>
          <h3 className="font-bold mb-2">5. Payment and Fees.</h3>
          <p>
          (a) Service Fees. Tarot Enigma may charge fees for bookings, membership plans, or marketplace sales. Fee details are available on our website. All payments are non-refundable except where required by law or explicitly stated.
          </p>
          <p>
          (b) Taxes. You are responsible for any taxes, VAT, or applicable sales duties related to your purchases or income earned on Tarot Enigma. Tarot Enigma does not withhold income tax for readers and sellers.
          </p>
          <h3 className="font-bold mb-2">6. Termination.</h3>
          <p>
          (a) You may terminate your account at any time. Tarot Enigma may suspend or terminate your access for violating these terms, failing to make required payments, or using the platform in harmful or unlawful ways.
          </p>
          <p>
          (b) Upon termination, we may delete your data and content unless we are required by law or have valid business purposes to retain it (e.g., financial records).
          </p>

          <h3 className="font-bold mb-2">7. Intellectual Property and Rights.</h3>
          <p>
          (a) Your Content. You retain ownership of any content you post. You grant Tarot Enigma a license to use your content solely for the operation of the Platform Services.
          </p>
          <p>
          (b) Platform Rights. All trademarks, logos, and software on the platform are owned by Tarot Enigma or its licensors. You may not copy, modify, reverse-engineer, or resell any part of the Platform without our permission.
          </p>
          <p>
          (c) Feedback. If you provide feedback or suggestions, we may use them to improve the platform without owing you any compensation.
          </p>
          <h3 className="font-bold mb-2">8. Community Guidelines.</h3>
          <p>
          You agree to respect all users of the platform and refrain from abusive, discriminatory, or spam behavior. We reserve the right to moderate content or suspend accounts that violate community standards.
          </p>
        </section>
        </div>
      </div>
    </div>
  );
}