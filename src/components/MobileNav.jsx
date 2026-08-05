import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function MobileNav() {
  const location = useLocation();
  const { cartCount, wishlistCount } = useCart();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-md border-t-2 border-[#d4af37] z-50">
      <div className="flex justify-around py-3 pb-safe">
        <Link
          to="/"
          className={`flex flex-col items-center text-[0.65rem] gap-1 py-1 transition-all ${isActive("/") ? "text-[#d4af37]" : "text-[#888]"}`}
        >
          <i className="fas fa-home text-base"></i>
          <span>Home</span>
        </Link>

        <Link
          to="/products"
          className={`flex flex-col items-center text-[0.65rem] gap-1 py-1 transition-all ${isActive("/products") ? "text-[#d4af37]" : "text-[#888]"}`}
        >
          <i className="fas fa-box text-base"></i>
          <span>Products</span>
        </Link>

        <Link
          to="/cart"
          className={`flex flex-col items-center text-[0.65rem] gap-1 py-1 transition-all ${isActive("/cart") ? "text-[#d4af37]" : "text-[#888]"}`}
        >
          <div className="relative">
            <i className="fas fa-shopping-cart text-base"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </Link>

        <Link
          to="/wishlist"
          className={`flex flex-col items-center text-[0.65rem] gap-1 py-1 transition-all ${isActive("/wishlist") ? "text-[#d4af37]" : "text-[#888]"}`}
        >
          <div className="relative">
            <i className="fas fa-heart text-base"></i>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span>Saved</span>
        </Link>
      </div>
    </div>
  );
}
