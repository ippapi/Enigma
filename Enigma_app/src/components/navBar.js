import { Search } from 'lucide-react'; 

const Header = () => {
  return (
    <header className="bg-transparent absolute top-0 left-0 w-full z-50 text-white py-4 px-8 flex justify-between items-center font-light tracking-wider">
      {/* Logo */}
      <div className="text-xl tracking-wide ">
        Tarot Enigma
      </div>

      {/* Menu items */}
      <nav className="flex items-center space-x-6 text-sm uppercase">
        <Search className="w-5 h-5 cursor-pointer" />
        <a href="#" className="hover:text-gray-300 transition">Shop</a>
        <a href="#" className="hover:text-gray-300 transition">Booking</a>
        <a href="#" className="hover:text-gray-300 transition">Discount</a>
        <a href="#" className="hover:text-gray-300 transition">Shopping Cart</a>
        <a href="#" className="hover:text-gray-300 transition">Contacts</a>
      </nav>
    </header>
  );
};

export default Header;
