'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
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
          PRIVACY POLICY
        </h2>
        <div className=" text-gray-800 text-left px-4 md:px-24 py-8 flex-grow space-y-10  mx-auto text-sm md:text-base leading-relaxed [&_p]:mb-2">
          <p><i>This Privacy Policy was last revised on 22 September, 2023.</i></p>
          <section>
          <p>
          At Tarot Enigma, we care deeply about your privacy. This policy explains how we collect, use, and protect your personal data when you use our website and services, including tarot readings, spiritual guidance, blogs, and online purchases.
          </p>

          <h3 className="font-bold mb-2">1. Who we are</h3>
          <p>
          Tarot Enigma is a website created by a group of students from UIT as part of a class project. If you have any questions, feel free to email us at: uit@gm.uit.edu.vn
          </p>
          <h3 className="font-bold mb-2">2. What information we collect</h3>
          <p>We may collect the following types of information:</p>
          <p>a) Information you give us:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Your name, email, phone number</li>
            <li>Messages or questions you send to us</li>
            <li>Booking or order details</li>
            <li>Feedback and reviews</li>
          </ul>
          <p>b) Information collected automatically:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>IP address, browser type, device info</li>
            <li>Pages you visit and time spent</li>
            <li>Cookies (used to remember you and improve the site)</li>
          </ul>

          <h3 className="font-bold mb-2">3. How we use your information</h3>
          <p>We use your data to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide tarot readings and guidance sessions</li>
            <li>Send confirmations and reminders</li>
            <li>Process payments and orders</li>
            <li>Improve our services and website</li>
            <li>Respond to your messages</li>
            <li>Share updates or blog posts (if you subscribed)</li>
          </ul>

          <h3 className="font-bold mb-2">4. Do we share your information?</h3>

          <h3 className="font-bold mb-2">4.1 With service providers</h3>
          <p>
          We work with trusted third parties who help us run the website, process payments, store data, and send emails. They can only use your information to help us — not for their own purposes.          
          </p>

          <h3 className="font-bold mb-2">4.2 With your permission</h3>
          <p>
          We will never share your information with sponsors or other companies unless you clearly say yes (for example, by signing up for a co-hosted event).          
          </p>

          <h3 className="font-bold mb-2">4.3 For legal reasons</h3>
          <p>We may share your data if required by law, or to protect our users and our platform from fraud or threats.</p>

          <h3 className="font-bold mb-2">5. Cookies</h3>
          <p>We use cookies to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Keep you logged in</li>
            <li>Remember your preferences</li>
            <li>Understand how people use our site</li>
          </ul>
          <p>You can turn off cookies in your browser settings if you like.</p>

          <h3 className="font-bold mb-2">6. Your Choices</h3>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access or edit your personal information</li>
            <li>Unsubscribe from our emails at any time</li>
            <li>Request to delete your account and data</li>
          </ul>
          <p>To make a request, email us at uit@gm.uit.edu.vn</p>

          <h3 className="font-bold mb-2">7. How we protect your data</h3>
          <p>We use reasonable security measures to keep your information safe. However, please note that no method of data transmission is 100% secure on the internet.</p>

          <h3 className="font-bold mb-2">8. How long we keep your data</h3>
          <p>We keep your information only as long as needed to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide our services</li>
            <li>Follow legal rules</li>
            <li>Improve your experience</li>
          </ul>

          <h3 className="font-bold mb-2">9. Changes to this policy</h3>
          <p>We may update this policy from time to time. If the changes are important, we’ll let you know by email or by posting a notice on our website.</p>

          <h3 className="font-bold mb-2">10. Contact us</h3>
          <p>If you have any questions or concerns, please reach out: uit@gm.uit.edu.vn</p>
          <p>Thank you for trusting Tarot Enigma. We're here to support your journey with care, clarity, and respect for your privacy.</p>
        </section>
        </div>
      </div>
    </div>
  );
}