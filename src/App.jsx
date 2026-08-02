import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
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
          </Routes>

          <Footer />
          <WhatsAppFloat />
          <MobileNav />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
