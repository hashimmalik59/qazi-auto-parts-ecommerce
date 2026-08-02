import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <header className="py-20 md:py-28 bg-[#0a0a0a] text-center px-6 relative overflow-hidden">
      {/* Background car icons */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <i className="fas fa-car-side text-[15rem] absolute -left-20 top-10"></i>
        <i className="fas fa-truck-monster text-[15rem] absolute -right-20 top-10"></i>
      </div>

      <h1 className="text-5xl md:text-7xl font-black italic text-[#d4af37] mb-2 relative z-10">
        Qazi Auto Parts
      </h1>

      <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 relative z-10">
        The Global Hub for{" "}
        <span className="text-[#d4af37]">Every Spare Part</span>
      </h2>

      <p className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.6em] font-bold mb-8 relative z-10">
        China • USA • Japan • Germany • Korea • France • Italy
      </p>

      <div className="flex gap-4 justify-center relative z-10">
        <Link
          to="/products"
          className="bg-[#d4af37] text-black px-8 py-3 rounded-full font-black text-sm uppercase hover:bg-white transition shadow-lg shadow-yellow-600/20"
        >
          Shop Now <i className="fas fa-arrow-right ml-2"></i>
        </Link>

        <button
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="border-2 border-[#d4af37] text-[#d4af37] px-8 py-3 rounded-full font-bold text-sm uppercase hover:bg-[#d4af37] hover:text-black transition"
        >
          About Us
        </button>
      </div>
    </header>
  );
}
