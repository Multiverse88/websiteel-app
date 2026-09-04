import { posStyle, sectionScale } from '../utils';
import React from "react";
import { Truck, Gift, ShoppingBag, ExternalLink } from "lucide-react";

interface Props {
  data: any;
}

;

export default function BottomPromoSection({ data }: Props) {
  const content = data.content || data;
  const styles = data.styles || {};
  const pos = styles.positions;

  const card1Tag = content.card1Tag || "JANGKAUAN NASIONAL";
  const card1Title = content.card1Title || "Melayani Seluruh Indonesia";
  const card1Desc = content.card1Desc || "Semua biaya tertera di awal — termasuk jasa kami dan biaya pemerintah. Tidak ada add-on mendadak di tengah proses.";
  
  const card2Tag = content.card2Tag || "LEGAL FESTIVAL SPECIAL";
  const card2Title = content.card2Title || "Menangkan iPhone & Hadiah senilai Rp 12.000.000";
  const card2Badge = content.card2Badge || "Setiap pembuatan PT berkesempatan dapat iPhone";
  const card2Image = content.card2Image || "/images/iphone-mockup.png";

  const marketplaceTitle = content.marketplaceTitle || "Transaksi Aman Via Marketplace";
  const marketplaceLogo = content.marketplaceLogo || "/images/shopee.svg";
  const marketplaceImage = content.marketplaceImage || "/images/transaksi-shopee.png";
  const marketplaceDesc = content.marketplaceDesc || "Masih ragu bertransaksi online? Tenang, layanan pendirian perusahaan, perizinan usaha, dan pendaftaran HAKI kami tersedia di marketplace (Shopee) dengan jaminan transaksi yang aman dan terpercaya.";
  const marketplaceLink = content.marketplaceLink || "https://shopee.co.id/easylegal";

  const paddingStyle = {
    paddingTop: styles.paddingTop || "48px",
    paddingBottom: styles.paddingBottom || "64px",
  };

  
  

return (
    <section className="bg-white relative overflow-hidden" style={paddingStyle}>
      <div style={sectionScale(data.styles) !== 1 ? { transform: `scale(${sectionScale(data.styles)})`, transformOrigin: "top center", width: "100%" } : {}}>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Top Cards (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Jangkauan Nasional */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex gap-5 sm:gap-6 items-start shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-red-100 flex-shrink-0 flex items-center justify-center bg-white shadow-sm">
              <Truck className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col pt-1 text-left">
              <span className="text-xs sm:text-sm font-extrabold text-gray-400 tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                {card1Tag}
              </span>
              <div style={posStyle(pos, 'card1Title')}>
                <h3 className="text-base sm:text-lg font-black text-gray-900 leading-[1.2] mb-2 sm:mb-3">
                  {card1Title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-[280px]">
                {card1Desc}
              </p>
            </div>
          </div>

          {/* Card 2: Legal Festival */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex gap-5 sm:gap-6 items-start shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-sm border border-black/5 bg-gray-50 flex items-center justify-center">
              <img 
                src={card2Image} 
                alt="Promo iPhone" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
            <div className="flex flex-col pt-1 text-left">
              <span className="text-xs sm:text-sm font-extrabold text-gray-400 tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                {card2Tag}
              </span>
              <div style={posStyle(pos, 'card2Title')}>
                <h3 className="text-base sm:text-lg font-black text-gray-900 leading-[1.2] mb-1 sm:mb-2">
                  {card2Title}
                </h3>
              </div>
              {card2Badge && (
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-[#990202] text-white px-3 py-1.5 rounded-full mt-2 text-[12px] sm:text-[13px] font-bold tracking-wide shadow-sm text-left">
                    <Gift className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" strokeWidth={2.5} /> 
                    <span>{card2Badge}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Marketplace */}
        <div className="mt-14 sm:mt-20 pt-12 sm:pt-16 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
          {/* Image Side */}
          <div className="relative w-[280px] sm:w-[360px] h-[210px] sm:h-[270px] flex-shrink-0 flex items-center justify-center">
            <img 
              src={marketplaceImage} 
              alt="Transaksi Aman via Marketplace" 
              className="w-full h-full object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* Content Side */}
          <div className="max-w-md text-center md:text-left flex flex-col items-center md:items-start relative">
            <div style={posStyle(pos, 'marketplaceTitle')}>
              <h3 className="text-[26px] sm:text-[34px] font-black text-gray-900 leading-[1.15] mb-4 sm:mb-5 tracking-tight">
                {marketplaceTitle}
              </h3>
            </div>
            
            {marketplaceLogo && (
              <div className="relative w-[130px] sm:w-[150px] h-[40px] sm:h-[45px] mb-5 sm:mb-6">
                <img 
                  src={marketplaceLogo} 
                  alt="Shopee Logo" 
                  className="h-full object-contain object-center md:object-left"
                />
              </div>
            )}
            
            <p className="text-sm sm:text-base text-gray-500 leading-[1.8] max-w-sm mb-5">
              {marketplaceDesc}
            </p>

            {marketplaceLink && (
              <a
                href={marketplaceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#EE4D2D] hover:bg-[#D73211] text-white rounded-xl text-sm font-bold shadow-md transition"
              >
                <ShoppingBag size={16} />
                <span>Kunjungi Toko Shopee</span>
                <ExternalLink size={14} className="opacity-80" />
              </a>
            )}
          </div>
        </div>

      </div>
      </div>

    </section>
  );
}
