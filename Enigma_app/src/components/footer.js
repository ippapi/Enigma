const Footer = () => {
  return (
    <footer className="bg-[#3F2366] text-white p-7 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {}
        <p className="text-sm">&copy; 2024 Tarot Enigma. All rights reserved.</p>
        {}
        <nav>
          <ul className="flex space-x-6 text-sm">
            <li><a href="#" className="hover:underline">Trang chủ</a></li>
            <li><a href="#" className="hover:underline">Sản phẩm</a></li>
            <li><a href="#" className="hover:underline">Chính sách và quy định</a></li>
            <li><a href="#" className="hover:underline">Liên hệ</a></li>
          </ul>
        </nav>
        {}
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/UIT.Fanpage" className="hover:text-gray-400">📘</a> {}
          <a href="https://www.youtube.com/channel/UCe0DO-rAJNJy-YNTTM9oEOA" className="hover:text-gray-400">🐦</a> {}
          <a href="https://www.instagram.com/uituniversity/?hl=en" className="hover:text-gray-400">📸</a> {}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
