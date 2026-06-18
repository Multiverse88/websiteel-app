import React from "react";
import Image from "next/image";
import { MapPin, Clock, Phone } from "lucide-react";

interface Office {
  city: string;
  tag: string;
  addr: string;
  hours: string;
  tel: string;
  map: string;
  img: string;
}

interface OfficesProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const officesData: Office[] = [
  {
    city: "Bandung",
    tag: "Kantor Pusat",
    addr: "Jl. Asia Afrika No. 1, Sumur Bandung, Kota Bandung, Jawa Barat 40111",
    hours: "Sen–Sab · 08–17",
    tel: "022-1234-5678",
    map: "https://maps.google.com",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?fit=crop&w=600&h=400&q=80",
  },
  {
    city: "Jakarta",
    tag: "Branch Office",
    addr: "Jl. Jenderal Sudirman Kav. 52-53, Setiabudi, Jakarta Selatan, DKI Jakarta 12190",
    hours: "Sen–Sab · 08–17",
    tel: "021-1234-5678",
    map: "https://maps.google.com",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?fit=crop&w=600&h=400&q=80",
  },
  {
    city: "Bekasi",
    tag: "Branch Office",
    addr: "Jl. Ahmad Yani No. 10, Marga Jaya, Bekasi Selatan, Kota Bekasi, Jawa Barat 17141",
    hours: "Sen–Sab · 08–17",
    tel: "021-9876-5432",
    map: "https://maps.google.com",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?fit=crop&w=600&h=400&q=80",
  },
];

export default function Offices({
  title = "Kantor Kami",
  subtitle = "Hadir di 3 kota, melayani seluruh Indonesia.",
  description = "Walaupun proses kami 100% online, kami tetap punya kantor fisik yang bisa Anda kunjungi.",
}: OfficesProps) {
  return (
    <section className="bg-[#F9FAFB] py-20 border-b border-gray-200/40 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-wider">{title}</p>
          <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
            {subtitle}
          </h2>
          <p className="text-[14.5px] text-gray-500 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {officesData.map((office, idx) => (
            <a
              key={idx}
              href={office.map}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              title="Buka di Google Maps"
            >
              {/* Office Image and Tag Overlay */}
              <div className="relative aspect-[1.5] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                <Image
                  src={office.img}
                  alt={`Kantor EasyLegal ${office.city}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Tag Overlay */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm border ${
                      office.tag === "Kantor Pusat"
                        ? "bg-[#990202] text-white border-red-900/10"
                        : "bg-white text-gray-900 border-gray-200/50"
                    }`}
                  >
                    {office.tag}
                  </span>
                </div>
              </div>

              {/* Office Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  {/* MapPin and City */}
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-[#990202] flex-shrink-0" strokeWidth={2.5} />
                    <h3 className="font-inter text-[18px] sm:text-[20px] font-extrabold text-gray-950 group-hover:text-[#990202] transition-colors leading-snug">
                      {office.city}
                    </h3>
                  </div>
                  
                  {/* Address */}
                  <p className="text-[13px] text-gray-500 leading-relaxed font-normal mt-3">
                    {office.addr}
                  </p>
                </div>

                {/* Hours and Telephone Footer */}
                <div className="flex items-center justify-between text-[12px] text-gray-500 font-bold border-t border-gray-100 mt-5 pt-4">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.8 h-3.8 text-[#990202] flex-shrink-0" strokeWidth={2.5} />
                    <span>{office.hours}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Phone className="w-3.8 h-3.8 text-[#990202] flex-shrink-0" strokeWidth={2.5} />
                    <span>{office.tel}</span>
                  </div>
                </div>
              </div>

            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
