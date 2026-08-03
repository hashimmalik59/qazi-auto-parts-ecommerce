import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import WhatsAppFloat from "./WhatsAppFloat";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import HeroSection from "./HeroSection";
import BrandFilter from "./BrandFilter";
import FeaturedProducts from "./FeaturedProducts";
import AboutSection from "./AboutSection";
import ProductsPage from "./ProductsPage";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";
import WishlistPage from "./WishlistPage";
import NotFound from "./NotFound";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

// Title change karne wala helper
function usePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

// Pages / Wrappers
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

export default function AppContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-[#050505] text-[#e2e8f0] pb-20 md:pb-0">
      {!isAuthPage && <Navbar onSearch={setSearchQuery} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products"
          element={<ProductsPageWrapper searchQuery={searchQuery} />}
        />
        <Route path="/product/:id" element={<ProductDetailWrapper />} />
        <Route path="/cart" element={<CartPageWrapper />} />
        <Route path="/wishlist" element={<WishlistPageWrapper />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundWrapper />} />
      </Routes>

      {!isAuthPage && <Footer />}

      <WhatsAppFloat />
      <ScrollToTop />
      <MobileNav />
    </div>
  );
}
