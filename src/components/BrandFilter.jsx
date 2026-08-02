import { useState } from "react";
import { brandsData } from "../data/brands";

export default function BrandFilter() {
  const [active, setActive] = useState("china");

  const countries = [
    { key: "china", label: "China", flag: "cn" },
    { key: "usa", label: "America", flag: "us" },
    { key: "japan", label: "Japan", flag: "jp" },
    { key: "germany", label: "Germany", flag: "de" },
    { key: "korea", label: "S. Korea", flag: "kr" },
    { key: "france", label: "France", flag: "fr" },
    { key: "machinery", label: "Machinery", flag: null },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center text-2xl font-black italic mb-10 text-[#d4af37]">
          Brands We Cover
        </h3>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {countries.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                active === c.key
                  ? "border-[#d4af37] bg-[#d4af37]/10 scale-105 shadow-lg shadow-yellow-600/10"
                  : "border-[#222] bg-[#111] hover:border-[#d4af37]/50"
              }`}
            >
              {c.flag ? (
                <img
                  src={`https://flagcdn.com/w40/${c.flag}.png`}
                  className="w-6 rounded"
                  alt={c.label}
                />
              ) : (
                <i className="fas fa-truck-monster text-[#d4af37]"></i>
              )}
              <span className="text-xs font-black uppercase tracking-widest text-white">
                {c.label}
              </span>
            </button>
          ))}
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {brandsData[active].map((brand, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center h-36 border-2 border-[#222] hover:border-[#d4af37] hover:-translate-y-2 transition-all duration-300 shadow-lg"
            >
              <img
                src={brand.img}
                alt={brand.name}
                className="h-12 object-contain mb-2"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/100x50?text=${encodeURIComponent(brand.name)}`;
                }}
              />
              <p className="text-[11px] font-black uppercase text-black text-center">
                {brand.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
