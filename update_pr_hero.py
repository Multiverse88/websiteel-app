with open("src/app/layanan/press-release/page.tsx", "r") as f:
    content = f.read()

target = """                {/* Main Dark Backdrop Graphic */}
                <div className="w-full h-full rounded-[36px] bg-gradient-to-br from-[#121E36] via-[#0C1221] to-[#600C0F] p-7 shadow-2xl relative border border-gray-800 flex flex-col justify-between overflow-hidden">

                  {/* Glowing detail */}
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#990202]/30 rounded-full blur-3xl pointer-events-none" />

                  {/* Mockup Header bar */}
                  <div className="flex items-center justify-between border-b border-gray-850 pb-4">
                    <div className="flex space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] font-extrabold text-gray-500 tracking-wider uppercase">PORTAL BERITA NASIONAL</span>
                  </div>

                  {/* Mockup Body Content - News Preview */}
                  <div className="my-6 bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-gray-800/60 shadow-inner space-y-4 text-left">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#990202] animate-ping" />
                        <span className="text-[9px] font-extrabold text-[#990202] tracking-wider uppercase">BREAKING · 14 MEI 2026</span>
                      </div>
                      <h4 className="text-[15.5px] font-black text-white mt-2.5 leading-snug">
                        &quot;Startup UMKM Indonesia Catat Pertumbuhan Pesat di Kuartal Pertama 2026&quot;
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-semibold mt-2">
                        Liputan eksklusif tentang ekspansi bisnis Anda — terbit permanen di media nasional pilihan dengan jangkauan jutaan pembaca.
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {["#Bisnis", "#Startup", "#UMKM", "#Inovasi"].map((tag) => (
                        <span key={tag} className="text-[9px] font-black text-gray-455 bg-gray-850 px-2 py-0.5 rounded border border-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-gray-800/50 flex items-center justify-between text-[9.5px] font-bold text-gray-400">
                      <span>EasyPress</span>
                      <span>· Dipublikasi di Detik, Kontan, Tribun &amp; 100+ media lainnya</span>
                    </div>
                  </div>

                  {/* Mockup footer data */}
                  <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold border-t border-gray-800/50 pt-4">
                    <span>SEBARAN MEDIA NASIONAL</span>
                    <span className="flex items-center gap-1.5 text-[#990202]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#990202] animate-pulse" />
                      Index Google Cepat
                    </span>
                  </div>

                </div>"""

replacement = """                {/* Main Dark Backdrop Graphic */}
                <div className="w-full h-full rounded-[36px] bg-gradient-to-br from-[#4a0a0a] via-[#240606] to-[#3b0909] p-7 sm:p-9 shadow-2xl relative border border-red-950/30 flex flex-col justify-center overflow-hidden">

                  {/* NEWS Typography Pattern Background */}
                  <div className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-center pointer-events-none select-none opacity-[0.08] -ml-8 -mt-12" style={{ transform: "rotate(-10deg) scale(1.6)" }}>
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="whitespace-nowrap font-black text-[32px] sm:text-[40px] leading-tight text-white uppercase tracking-widest">
                        NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS
                      </div>
                    ))}
                  </div>

                  {/* Mockup Body Content - News Preview */}
                  <div className="relative z-10 text-left space-y-4 sm:space-y-5">
                    <h4 className="text-[22px] sm:text-[25px] font-black text-white leading-[1.3] tracking-tight">
                      &quot;Startup UMKM Indonesia Catat Pertumbuhan Pesat di Kuartal Pertama 2026&quot;
                    </h4>
                    <p className="text-[12px] sm:text-[13px] text-gray-300 leading-relaxed font-semibold max-w-[90%]">
                      Liputan eksklusif tentang ekspansi bisnis Anda — terbit permanen di media nasional pilihan dengan jangkauan jutaan pembaca.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {["#Bisnis", "#Startup", "#UMKM", "#Inovasi"].map((tag) => (
                        <span key={tag} className="text-[10px] sm:text-[10.5px] font-bold text-gray-300 bg-white/10 px-2.5 py-1 rounded-md border border-white/5 backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 sm:pt-6 flex items-center text-[9.5px] sm:text-[10px] font-bold text-gray-400">
                      <strong className="text-white mr-1.5">EasyPress</strong> - Dipublikasi di Detik, Kontan, Tribun &amp; 100+ media lainnya
                    </div>
                  </div>

                </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open("src/app/layanan/press-release/page.tsx", "w") as f:
        f.write(content)
    print("Successfully replaced.")
else:
    print("Target not found.")
