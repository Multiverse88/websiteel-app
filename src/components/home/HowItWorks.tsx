"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Building2, FileText, ShieldCheck, Award } from "lucide-react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Pilih Layanan",
      description: "Browse 15+ jenis layanan legal sesuai kebutuhan bisnis Anda.",
      features: [
        "Harga transparan di awal — termasuk biaya pemerintah dan jasa kami.",
        "15+ kategori: PT, NIB, Merek, ISO, Virtual Office, dan banyak lagi.",
        "Konsultasi gratis sebelum mulai — tanpa komitmen.",
      ],
    },
    {
      num: "02",
      title: "Konsultasi Gratis",
      description: "Hubungi tim legal kami langsung untuk membahas kebutuhan spesifik bisnis Anda.",
      features: [
        "Respons cepat dalam 5 menit melalui WhatsApp atau telepon.",
        "Analisis KBLI dan kesesuaian merek gratis oleh tim expert.",
        "Rekomendasi badan usaha yang paling efisien untuk modal Anda.",
      ],
    },
    {
      num: "03",
      title: "Kirim Dokumen Online",
      description: "Upload data dan dokumen pendukung dengan aman melalui partner portal kami.",
      features: [
        "Formulir digital terpadu — pengisian tidak sampai 10 menit.",
        "Enkripsi data standar perbankan menjamin kerahasiaan Anda.",
        "Notifikasi otomatis saat dokumen diverifikasi oleh tim legal.",
      ],
    },
    {
      num: "04",
      title: "Terima Hasil Digital",
      description: "Unduh seluruh dokumen resmi yang sudah selesai langsung dari dashboard Anda.",
      features: [
        "Dokumen digital ber-TTE resmi dan terdaftar di database kementerian.",
        "Pengiriman salinan fisik/hardcopy langsung ke alamat kantor Anda.",
        "Akses seumur hidup ke arsip dokumen legal Anda tanpa biaya tambahan.",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em] mb-3">
              Cara Kerja
            </span>
            <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] leading-[1.12] tracking-[-0.02em]">
              Empat Langkah, Semua Beres<br />Tanpa Pusing.
            </h2>
            <p className="mt-4 text-[14.5px] text-[#6B7280] leading-relaxed max-w-[460px]">
              Proses transparan dari konsultasi sampai dokumen di tangan Anda — semua bisa dipantau dari satu dashboard.
            </p>

            <div className="mt-8 space-y-0">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div 
                    key={idx} 
                    className="border-b border-gray-100 py-5 transition-all duration-300"
                  >
                    {isActive ? (
                      <div className="flex flex-col text-left">
                        <button 
                          onClick={() => setActiveStep(idx)}
                          className="flex items-center gap-3 text-left group"
                        >
                          <span className="text-[#B91C1C] text-[18px] font-extrabold transition-transform duration-200 group-hover:translate-x-1">
                            →
                          </span>
                          <span className="text-[17px] font-black text-[#111827]">
                            {step.title}
                          </span>
                        </button>
                        
                        <div className="mt-3 pl-7 transition-all duration-300">
                          <p className="text-[13px] text-[#6B7280] font-medium leading-relaxed mb-4">
                            {step.description}
                          </p>
                          <ul className="space-y-3">
                            {step.features.map((feat, fidx) => (
                              <li key={fidx} className="flex items-start gap-3 text-[13px] text-gray-700 leading-snug">
                                <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm border border-emerald-100">
                                  <Check className="w-3.5 h-3.5 text-[#16A34A]" strokeWidth={3} />
                                </div>
                                <span className="font-medium text-gray-600">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveStep(idx)}
                        className="flex items-center gap-4 w-full text-left py-1 hover:text-gray-900 group"
                      >
                        <span className="text-[#9CA3AF] text-[14.5px] font-extrabold tracking-wider w-6">
                          {step.num}
                        </span>
                        <span className="text-[16px] font-semibold text-gray-400 group-hover:text-gray-700 transition-colors duration-150">
                          {step.title}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 relative w-full h-[360px] xs:h-[420px] sm:h-[520px] flex items-center justify-center scale-[0.68] xs:scale-[0.8] sm:scale-95 md:scale-100 lg:scale-[0.9] xl:scale-100 origin-center transition-all duration-500">
            {activeStep === 0 && (
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-6 left-[22%] w-[60%] h-[78%] rounded-[2.5rem] bg-gradient-to-br from-[#F2994A] to-[#F2C94C] shadow-lg opacity-95 transition-all duration-500" />
                <div className="absolute top-10 left-[24%] w-[58%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-50 transition-all duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=600&h=800&q=80"
                    alt="Professional woman smiling" 
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-2 left-[18%] w-24 h-24 bg-[#D1E7DD] rounded-tr-[5.5rem] rounded-bl-[1.5rem] z-20 shadow-sm border border-[#C1D7CD]/30" />
                <div className="absolute top-0 right-4 w-[28%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white bg-slate-50 z-30 transition-all duration-500 hover:rotate-1">
                  <Image 
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?fit=crop&w=300&h=800&q=80"
                    alt="Signing document" 
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                  />
                  <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md z-40">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-[16%] left-0 w-[48%] bg-white rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-30 border border-gray-100/60 animate-float-slow transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#B91C1C] flex items-center justify-center text-white font-extrabold text-[12px] flex-shrink-0">
                      01
                    </div>
                    <div>
                      <div className="text-[12px] font-black text-[#111827] leading-tight">Pilih Layanan</div>
                      <div className="text-[9px] text-[#6B7280] font-semibold mt-0.5">Tentukan jasa legal yang Anda butuhkan</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="border border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300">
                      <div className="w-7 h-7 rounded-lg bg-[#B91C1C] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Building2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-black text-[#B91C1C] leading-tight truncate">Pendirian PT</div>
                        <div className="text-[8px] font-bold text-[#B91C1C] mt-0.5 leading-none">Mulai Rp2,5jt</div>
                      </div>
                    </div>
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300">
                      <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">NIB & OSS</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Mulai Rp500rb</div>
                      </div>
                    </div>
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300">
                      <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">Daftar Merek</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Mulai Rp1,5jt</div>
                      </div>
                    </div>
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300">
                      <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <Award className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">ISO 9001</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Konsultasi</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-[32%] right-1 bg-white rounded-full px-3 py-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2 z-40 animate-bounce-slow">
                  <div className="w-4.5 h-4.5 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#2E7D32]" strokeWidth={4} />
                  </div>
                  <div className="flex items-baseline leading-none">
                    <span className="text-[10px] font-black text-gray-800">Akta selesai</span>
                    <span className="text-[8px] text-gray-400 font-bold ml-1.5">2 menit lalu</span>
                  </div>
                </div>

                <div className="absolute top-[54%] -right-2 bg-white rounded-2xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-2 z-30 w-[170px] animate-float-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500 font-extrabold text-[12px] flex items-center gap-0.5">★ 4.9</span>
                    <span className="text-[8px] text-gray-400 font-black tracking-wider">GOOGLE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <Image className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User 1" width={22} height={22} />
                      <Image className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User 2" width={22} height={22} />
                      <Image className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="User 3" width={22} height={22} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Visuals for other steps (simplified for now as they weren't fully shown in original) */}
            {activeStep !== 0 && (
               <div className="bg-gray-50 w-full h-full rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
                       <Check className="w-8 h-8 text-[#B91C1C]" />
                    </div>
                    <p className="text-[14px] font-bold text-gray-400">Visual {steps[activeStep].title}</p>
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
