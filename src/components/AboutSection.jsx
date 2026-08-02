export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#111] to-black border-2 border-[#d4af37] rounded-[40px] p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: About Text */}
          <div>
            <h3 className="text-[#d4af37] text-3xl md:text-4xl font-black uppercase italic mb-6">
              About Qazi Auto Parts
            </h3>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Welcome to Qazi Auto Parts, your premier global partner in
                automotive and heavy machinery spare parts. Based in Yiwu, China
                — the world's largest trading hub — we bridge high-quality
                manufacturing with global demand.
              </p>
              <p>
                Under CEO Muhammad Arif's leadership, we ensure genuine quality,
                competitive pricing, and lightning-fast global shipping. From
                luxury sedans to massive excavators — we have the parts you
                need.
              </p>
            </div>
          </div>

          {/* Right: Credentials Card */}
          <div className="bg-black/50 rounded-3xl border border-[#d4af37]/20 p-8">
            <h4 className="text-white text-xl font-black uppercase italic mb-6 border-b border-[#d4af37] pb-2 inline-block">
              Company Credentials
            </h4>

            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <i className="fas fa-user-tie text-[#d4af37] text-2xl w-8"></i>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold">
                    CEO / Founder
                  </p>
                  <p className="text-white font-bold">Muhammad Arif</p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <i className="fas fa-map-marker-alt text-[#d4af37] text-2xl w-8"></i>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold">
                    Head Office
                  </p>
                  <p className="text-white font-bold text-sm">
                    Shop 68470-68471, 8th Street, Gate 103, Dist. 5, Yiwu, China
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <i className="fab fa-whatsapp text-[#d4af37] text-2xl w-8"></i>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold">
                    Direct Inquiry
                  </p>
                  <p className="text-white font-bold">+86 15158939407</p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <i className="fab fa-weixin text-[#d4af37] text-2xl w-8"></i>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold">
                    WeChat ID
                  </p>
                  <p className="text-white font-bold">M751466267</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
