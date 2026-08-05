import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar({ onSearch }) {
  const { cartCount, wishlist } = useCart();
  const { user, signOut } = useAuth();
  const wishlistCount = wishlist.length;
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <img
            src="/Assets/logo.png"
            alt="Logo of Qazi auto parts"
            className="h-10 md:h-14"
          />
          <span className="text-sm md:text-lg lg:text-xl font-black italic text-[#d4af37] truncate max-w-[120px] md:max-w-full">
            QAZI AUTO PARTS
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Search */}
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            className="hidden md:block bg-[#111] border border-[#d4af37]/50 rounded-full px-4 py-2 text-sm w-48 lg:w-64 text-white focus:outline-none focus:border-[#d4af37]"
          />

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden text-gray-400 hover:text-[#d4af37]"
          >
            <i className="fas fa-search text-base"></i>
          </button>

          {/* Products Link (Desktop) */}
          <Link
            to="/products"
            className="hidden md:block text-gray-400 hover:text-[#d4af37] transition font-bold text-sm"
          >
            Products
          </Link>

          {/* 🟢 MOBILE MENU (Hamburger) - Sirf phone par dikhega */}
          <div className="relative md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-[#d4af37] transition"
            >
              <i
                className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-lg`}
              ></i>
            </button>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
              <div className="absolute right-0 top-12 w-40 bg-[#111] border border-[#d4af37]/30 rounded-xl p-3 shadow-xl z-50 flex flex-col gap-2">
                {user ? (
                  <>
                    <div className="text-[#d4af37] text-xs font-bold truncate px-2 py-1 border-b border-[#333]">
                      {user.email}
                    </div>
                    <Link
                      to="/profile"
                      className="text-sm text-gray-300 hover:text-[#d4af37] px-2 py-1 rounded transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={async () => {
                        setMobileMenuOpen(false);
                        await signOut();
                        navigate("/login");
                      }}
                      className="text-sm text-red-400 hover:text-red-500 px-2 py-1 rounded text-left transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-sm text-[#d4af37] font-bold px-2 py-1 rounded transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* 🟢 DESKTOP USER MENU - Sirf laptop par dikhega */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-[12px] text-[#d4af37] max-w-[100px] truncate">
                  {user.email}
                </span>
                <Link
                  to="/profile"
                  className="text-sm text-white hover:text-[#d4af37] font-bold transition"
                >
                  Profile
                </Link>
                <button
                  onClick={async () => {
                    await signOut();
                    navigate("/login");
                  }}
                  className="text-sm text-white hover:text-[#d4af37] font-bold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm text-[#d4af37] font-bold hover:text-white transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-400 hover:text-[#d4af37] transition"
          >
            <i className="fas fa-shopping-cart text-lg"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-gray-400 hover:text-[#d4af37] transition"
          >
            <i className="fas fa-heart text-lg"></i>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar (Expandable) */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <input
            type="text"
            placeholder="Search products..."
            autoFocus
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[#111] border border-[#d4af37]/50 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>
      )}
    </nav>
  );
}
