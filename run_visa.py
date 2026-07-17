import re
import sys

def patch_visa(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Ensure Pricing is imported
    if "import Pricing " not in content:
        content = content.replace('import FAQ from "@/components/FAQ";', 'import FAQ from "@/components/FAQ";\nimport Pricing, { PricingPackage } from "@/components/Pricing";')

    # Define the new mapped packages code
    mapped_packages_code = """
  const mappedPackages: PricingPackage[] = pricingData[activeCategory as keyof typeof pricingData].map((pkg: any) => ({
    title: pkg.title,
    price: pkg.price,
    strikePrice: pkg.originalPrice,
    subLabel: pkg.subtitle,
    isPopular: pkg.isPopular,
    buttonText: pkg.labelBtn,
    buttonLink: getWhatsAppLink(pkg.waText),
    groups: [
      {
        title: "LAMA PROSES",
        items: [{ text: pkg.lamaProses, checked: true }]
      },
      {
        title: "YANG DIPEROLEH",
        items: [{ text: pkg.yangDiperoleh, checked: true }]
      },
      {
        title: "BONUS",
        items: [
          { text: "Layanan Personal Legal Assistance", checked: true },
          { text: "1 Kupon: <strong>Undian iPhone</strong>", checked: true }
        ]
      },
      {
        title: "EXTRA BONUS",
        items: [
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan", checked: true },
          { text: "Dokumen SOP Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true }
        ]
      }
    ]
  }));
"""
    
    # Insert mapped_packages_code just before return (
    return_idx = content.find("  return (")
    content = content[:return_idx] + mapped_packages_code + "\n" + content[return_idx:]

    pricing_section_replacement = """      {/* ─── 3. PRICING SECTION ─── */}
      <Pricing 
        sectionTitleTag="BIAYA PENGURUSAN"
        sectionTitle="Pilih kategori sesuai kebutuhan."
        sectionSubtitle={
          <>
            Harga sudah include biaya negara (PNBP), pendampingan dokumen, & konsultasi penuh sampai izin terbit.
          </>
        }
        packages={mappedPackages}
        headerBottomContent={
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 bg-gray-200/50 rounded-2xl shadow-md border border-black/[0.04]">
              <button
                onClick={() => setActiveCategory("visa")}
                className={`px-5 py-2.5 rounded-xl text-[14px] font-extrabold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === "visa"
                    ? "bg-[#990202] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                {activeCategory === "visa" && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                <span>Visa Bisnis</span>
              </button>
              <button
                onClick={() => setActiveCategory("investor")}
                className={`px-5 py-2.5 rounded-xl text-[14px] font-extrabold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === "investor"
                    ? "bg-[#990202] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                {activeCategory === "investor" && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                <span>KITAS Investor</span>
              </button>
              <button
                onClick={() => setActiveCategory("tka")}
                className={`px-5 py-2.5 rounded-xl text-[14px] font-extrabold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === "tka"
                    ? "bg-[#990202] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                {activeCategory === "tka" && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                <span>KITAS TKA</span>
              </button>
            </div>
          </div>
        }
      />
"""

    # We need to replace the entire <section id="paket-harga"> ... </section>
    match_start = re.search(r'      {/\* ─── 3. PRICING SECTION ─── \*/}', content)
    match_end = re.search(r'      {/\* ─── 4. FAQ SECTION ─── \*/}', content)
    
    if match_start and match_end:
        content = content[:match_start.start()] + pricing_section_replacement + "\n" + content[match_end.start():]
        with open(filepath, 'w') as f:
            f.write(content)
        print("Visa KITAS patched successfully")
    else:
        print("Could not find section boundaries")

if __name__ == "__main__":
    patch_visa("src/app/layanan/visa-kitas/page.tsx")
