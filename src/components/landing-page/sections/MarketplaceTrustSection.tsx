import React from "react";
import { ShoppingBag, ExternalLink } from "lucide-react";

interface Props {
  data: any;
}

export default function MarketplaceTrustSection({ data }: Props) {
  const content = data.content || data;
  const styles = data.styles || {};

  const headline = content.headline || content.marketplaceTitle || "Transaksi Aman Via Marketplace";
  const marketplaceLogo = content.marketplaceLogo || "/images/shopee.svg";
  const marketplaceName = content.marketplaceName || "Shopee";
  const image = content.image || content.marketplaceImage || "/images/transaksi-shopee.png";
  const description = content.description || content.marketplaceDesc || "Masih ragu bertransaksi online? Tenang, layanan pendirian perusahaan, perizinan usaha, dan pendaftaran HAKI kami tersedia di marketplace (Shopee) dengan jaminan transaksi yang aman dan terpercaya.";
  const buttonText = content.buttonText;
  const buttonLink = content.buttonLink || content.marketplaceLink || "https://shopee.co.id/easylegal";

  const paddingStyle = {
    paddingTop: styles.paddingTop || "48px",
    paddingBottom: styles.paddingBottom || "48px",
  };

  return (
    <section className="bg-white relative overflow-hidden" style={paddingStyle}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
          
          {/* Image Side */}
          <div className="relative w-[280px] sm:w-[360px] h-[210px] sm:h-[270px] flex-shrink-0 flex items-center justify-center">
            <img 
              src={image} 
              alt="Transaksi Aman via Marketplace" 
              className="w-full h-full object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* Content Side */}
          <div className="max-w-md text-center md:text-left flex flex-col items-center md:items-start">
            <h3 className="text-[26px] sm:text-[34px] font-black text-gray-900 leading-[1.15] mb-4 sm:mb-5 tracking-tight">
              {headline}
            </h3>
            
            {marketplaceLogo && (
              <div className="relative w-[130px] sm:w-[150px] h-[40px] sm:h-[45px] mb-5 sm:mb-6">
                <img 
                  src={marketplaceLogo} 
                  alt={marketplaceName} 
                  className="h-full object-contain object-center md:object-left"
                />
              </div>
            )}
            
            <p className="text-sm sm:text-base text-gray-500 leading-[1.8] max-w-sm mb-5">
              {description}
            </p>

            {buttonText && (
              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#EE4D2D] hover:bg-[#D73211] text-white rounded-xl text-sm font-bold shadow-md transition"
              >
                <ShoppingBag size={16} />
                <span>{buttonText}</span>
                <ExternalLink size={14} className="opacity-80" />
              </a>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
