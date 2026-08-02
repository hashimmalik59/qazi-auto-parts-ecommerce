import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HeroSection from "./components/HeroSection";
import BrandFilter from "./components/BrandFilter";
import FeaturedProducts from "./components/FeaturedProducts";
import AboutSection from "./components/AboutSection";
import ProductsPage from "./components/ProductsPage";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import NotFound from "./components/NotFound";

// Title change karne wala helper
function usePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function HomePage() {
  usePageTitle("Qazi Auto Parts | Premium Auto Spare Parts");
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <BrandFilter />
      <FeaturedProducts />
      <AboutSection />
    </div>
  );
}

function ProductsPageWrapper({ searchQuery }) {
  usePageTitle("All Products | Qazi Auto Parts");
  return <ProductsPage searchQuery={searchQuery} />;
}

function ProductDetailWrapper() {
  usePageTitle("Product Details | Qazi Auto Parts");
  return <ProductDetail />;
}

function CartPageWrapper() {
  usePageTitle("Shopping Cart | Qazi Auto Parts");
  return <CartPage />;
}

function WishlistPageWrapper() {
  usePageTitle("My Wishlist | Qazi Auto Parts");
  return <WishlistPage />;
}

function NotFoundWrapper() {
  usePageTitle("Page Not Found | Qazi Auto Parts");
  return <NotFound />;
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
                element={<ProductsPageWrapper searchQuery={searchQuery} />}
              />
              <Route path="/product/:id" element={<ProductDetailWrapper />} />
              <Route path="/cart" element={<CartPageWrapper />} />
              <Route path="/wishlist" element={<WishlistPageWrapper />} />
              <Route path="*" element={<NotFoundWrapper />} />
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
