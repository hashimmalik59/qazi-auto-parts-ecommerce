import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import BrandFilter from "./components/BrandFilter";
import FeaturedProducts from "./components/FeaturedProducts";
import AboutSection from "./components/AboutSection";
import ProductsPage from "./components/ProductsPage";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import ScrollToTop from "./components/ScrollToTop";
import { useState } from "react";

function HomePage() {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <BrandFilter />
      <FeaturedProducts />
      <AboutSection />
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CartProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#050505] text-[#e2e8f0] pb-20 md:pb-0">
            <Navbar onSearch={setSearchQuery} />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/products"
                element={<ProductsPage searchQuery={searchQuery} />}
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Routes>

            <Footer />
            <WhatsAppFloat />
            <ScrollToTop />
            <MobileNav />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
