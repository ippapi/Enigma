const Footer = () => {
  return (
    <footer className="relative bg-[#0f172a] text-gray-300 pt-16 pb-36">
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-12 text-center md:text-left z-10 relative">
        <div className="flex-shrink-0">
          <a href="/images/Home/Footer.jpg" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/Home/Footer.jpg"
              alt="Pink Panther"
              className="w-[280px] h-auto"
            />
          </a>
        </div>

        {/* Nội dung bên phải */}
        <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-normal text-center md:text-left"
          style={{
            backgroundImage: 'linear-gradient(150deg, #00A1C7, #F5559E, #ED7D0C)',
            fontFamily: 'Anton, sans-serif'
          }}>
          MORE INFO
        </h2>



          <p className="text-lg text-gray-400 mb-4 leading-relaxed">
            The Tarot Enigma website was researched and developed by a group of UIT students as part of a course project. If you're interested in learning more, please contact us via email at
            <a href="mailto:uit@gm.uit.edu.vn" className="text-blue-400 hover:underline ml-1">uit@gm.uit.edu.vn</a>.
          </p>
          <p className="text-sm text-gray-500 mt-6">
            &copy; 2024 ÉT O ÉT. All rights reserved.
          </p>
        </div>
      </div>

      {/* Gradient đen phía dưới */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent z-0" />
    </footer>
  );
};

export default Footer;
