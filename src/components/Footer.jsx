import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-10 text-left">
          <div>
            <h4 className="text-[#d4af37] font-black uppercase italic mb-4">
              Qazi Auto Parts
            </h4>
            <p className="text-gray-500 text-sm">
              Global leader in automotive and heavy machinery spare parts based
              in Yiwu, China.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase mb-4 text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <Link to="/" className="hover:text-[#d4af37] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-[#d4af37] transition"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#d4af37] transition">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase mb-4 text-sm">
              Categories
            </h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>Body Parts</li>
              <li>Filters & Oil</li>
              <li>Lighting</li>
              <li>Electrical</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase mb-4 text-sm">
              Contact
            </h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <i className="fab fa-whatsapp mr-2 text-green-500"></i>+86
                15158939407
              </li>
              <li>
                <i className="fab fa-weixin mr-2 text-green-400"></i>M751466267
              </li>
              <li>Yiwu, China</li>
            </ul>
          </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">
          Qazi Auto Parts • Global Excellence • 2026
        </p>
      </div>
    </footer>
  );
}
