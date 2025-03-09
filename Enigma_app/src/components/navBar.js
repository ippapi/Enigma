const Header = () => {
  return (
    <header className="bg-white text-black p-5 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {}
        <div className="text-xl font-bold">
          <img src="Enigma\Enigma_app\public\images\Giới thiệu\logotarot-01.png" alt="Logo" className="h-10" />
        </div>
        {}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:underline">Trang chủ</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Sản phẩm</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Xem Tarot</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Booking</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Ưu đãi</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
