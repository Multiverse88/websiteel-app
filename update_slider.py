import re

with open("src/app/layanan/virtual-office/page.tsx", "r") as f:
    content = f.read()

# 1. Update imports to include useState and ChevronLeft
content = content.replace('import React from "react";', 'import React, { useState, useRef } from "react";')
content = content.replace('  ChevronRight,\n', '  ChevronRight,\n  ChevronLeft,\n')

# 2. Replace the VirtualOffice component start to include state and refs
start_comp = "export default function VirtualOffice() {"
comp_with_state = """export default function VirtualOffice() {
  const [activeLocIdx, setActiveLocIdx] = useState(0);
"""
content = content.replace(start_comp, comp_with_state)

# 3. Find the detail lokasi section and replace it with slider
start_pattern = "      {/* ─── 3.5 DETAIL LOKASI SECTION ─── */}"
end_pattern = "      {/* ─── 4. FAQ SECTION ─── */}"

start_idx = content.find(start_pattern)
end_idx = content.find(end_pattern)

new_section = """      {/* ─── 3.5 DETAIL LOKASI SECTION ─── */}
      <section className="py-8 sm:py-8 sm:py-8 sm:py-20 bg-[#F9FAFB] border-b border-gray-100 overflow-hidden relative">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative">
          
          {/* Section Header */}
          <div className="animate-fade-in-up text-center max-w-3xl mx-auto mb-8 sm:mb-8 sm:mb-16">
            <p className="text-[9px] sm:text-[11px] font-black text-[#990202] uppercase tracking-[0.2em] mb-1.5 sm:mb-3">DETAIL LOKASI</p>
            <h2 className="font-heading text-[20px] sm:text-[38px] font-black text-gray-950 leading-[1.25] sm:leading-tight tracking-tight">
              3 Lokasi Strategis Pilihan
            </h2>
            <p className="text-[12.5px] sm:text-[15px] text-gray-500 leading-relaxed mt-2 sm:mt-4 font-medium font-sans">
              Geser untuk melihat detail dari masing-masing cabang Virtual Office kami.
            </p>
            
            {/* Slider Tabs/Dots */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
              {locationsData.map((loc, idx) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocIdx(idx)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-[13px] font-extrabold transition-all duration-300 ${
                    activeLocIdx === idx
                      ? "bg-[#990202] text-white shadow-md"
                      : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {loc.cardTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Slider Content */}
          <div className="relative">
            {locationsData.map((loc, idx) => (
              <div 
                key={loc.id} 
                className={`transition-all duration-500 ease-in-out ${
                  activeLocIdx === idx 
                    ? "opacity-100 transform translate-x-0 relative z-10" 
                    : "opacity-0 absolute inset-0 pointer-events-none transform translate-x-8"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  {/* Left Column: Image & Floating Card */}
                  <div className="lg:col-span-6 relative">
                    <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-10 aspect-[4/3]">
                      <Image
                        src={loc.image}
                        alt={loc.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover"
                      />
                      {/* Floating Card */}
                      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 bg-white p-3 sm:p-4.5 rounded-xl sm:rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.06)] max-w-[245px] flex items-center gap-2.5 sm:gap-3.5 hover:scale-105 transition-transform duration-300">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 text-[#990202]">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <div className="text-[11.5px] sm:text-[13px] font-extrabold text-gray-950 leading-tight">{loc.cardTitle}</div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="flex gap-0.5 text-amber-500">
                              {[1,2,3,4,5].map(star => (
                                <svg key={star} className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                              ))}
                            </div>
                            <span className="text-[9px] sm:text-[10px] text-gray-600 font-bold leading-none">&middot; {loc.cardSubtitle}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Address Box & Services & Buttons */}
                  <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                    <h2 className="font-heading text-[20px] sm:text-[32px] font-black text-gray-950 leading-[1.25] sm:leading-tight tracking-tight">
                      {loc.title}
                    </h2>
                    <p className="text-[12.5px] sm:text-[15px] text-gray-500 leading-relaxed font-medium font-sans">
                      {loc.subtitle}
                    </p>

                    {/* Address Card */}
                    <div className="bg-white rounded-2xl shadow-md border border-black/[0.03] shadow-[0_10px_25px_rgba(0,0,0,0.015)] p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <p className="text-[8.5px] sm:text-[10px] font-black text-[#990202] uppercase tracking-[0.25em]">LOKASI OFFICE</p>
                      <h3 className="text-sm sm:text-[14.5px] font-extrabold text-gray-950 leading-relaxed whitespace-pre-line">
                        {loc.address}
                      </h3>
                    </div>

                    {/* Layanan yang disediakan */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-[14.5px] sm:text-[16px] font-black text-gray-950">Layanan yang disediakan:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-y-3">
                        <div className="space-y-2 sm:space-y-3">
                          {["Alamat komersial", "Dapat digunakan untuk PKP", "Legalitas gedung (IMB, PBB, dll)", "Surat perjanjian & domisili"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 sm:gap-2.5 text-[11.5px] sm:text-[13.5px] text-gray-500 font-medium leading-none">
                              <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-500">
                                <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                              </div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          {["Meeting Room", "LED Smart TV & Whiteboard", "WiFi & Internet High Speed", "Resepsionis profesional"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 sm:gap-2.5 text-[11.5px] sm:text-[13.5px] text-gray-500 font-medium leading-none">
                              <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-500">
                                <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                              </div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row gap-3 pt-3">
                      <a
                        href={loc.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center justify-center px-4 py-3 bg-[#990202] hover:bg-[#800000] text-white font-extrabold rounded-xl text-[12px] sm:text-[14px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.022-.079-.186-.208-.432-.332-.246-.123-1.455-.717-1.68-.8-.223-.082-.387-.122-.55.122-.165.245-.64.8-.787.969-.147.17-.294.19-.54.067-.244-.124-.992-.367-1.89-1.168-.698-.622-1.17-1.392-1.307-1.637-.136-.246-.015-.379.108-.501.112-.11.246-.287.37-.43.123-.14.164-.24.246-.4.082-.162.04-.303-.02-.427-.06-.124-.55-1.324-.752-1.815-.197-.474-.397-.41-.547-.418-.14-.008-.302-.008-.464-.008-.162 0-.427.06-.65.3-.224.24-.854.83-.854 2.03 0 1.201.874 2.36 1.996 3.86 1.123 1.5 2.617 2.29 4.193 2.97 1.573.68 2.36.545 3.208.435.85-.11 1.764-.72 2.012-1.417.25-.7.25-1.3.175-1.417-.075-.117-.24-.183-.34-.233zM12 22a9.96 9.96 0 01-5.066-1.378l-.363-.214-3.766.987 1.004-3.667-.235-.374A9.96 9.96 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10zm0-22C5.373 0 0 5.373 0 12a11.96 11.96 0 002.586 7.424L0 24l4.743-1.242A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                        </svg>
                        <span>WhatsApp Kami</span>
                      </a>
                      <a
                        href="#paket-harga"
                        className="flex-1 text-center justify-center px-4 py-3 bg-white shadow-md border border-black/[0.04] text-gray-800 hover:bg-gray-50 hover:border-gray-300 font-extrabold rounded-xl text-[12px] sm:text-[14px] shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1"
                      >
                        <span>Cek Lebih Lanjut</span>
                        <svg className="w-3.5 h-3.5 ml-0.5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Navigation Arrows (Desktop) */}
          <button 
            onClick={() => setActiveLocIdx((prev) => (prev === 0 ? locationsData.length - 1 : prev - 1))}
            className="hidden lg:flex absolute top-1/2 left-0 -translate-y-1/2 -ml-4 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-700 hover:text-[#990202] hover:scale-110 transition-all z-20 border border-gray-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveLocIdx((prev) => (prev === locationsData.length - 1 ? 0 : prev + 1))}
            className="hidden lg:flex absolute top-1/2 right-0 -translate-y-1/2 -mr-4 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-700 hover:text-[#990202] hover:scale-110 transition-all z-20 border border-gray-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
        </div>
      </section>\n\n"""

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_section + content[end_idx:]
    with open("src/app/layanan/virtual-office/page.tsx", "w") as f:
        f.write(content)
    print("Successfully converted section to slider.")
else:
    print("Could not find section boundaries.")
