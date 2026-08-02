import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollUp}
      className="fixed bottom-10 left-5 z-40 w-12 h-12 bg-[#d4af37] text-black rounded-full flex items-center justify-center text-lg shadow-lg shadow-yellow-600/20 hover:bg-white hover:scale-110 transition-all"
      aria-label="Scroll to top"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}
