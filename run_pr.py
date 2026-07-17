import re

def patch_pr(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Ensure Pricing is imported
    if "import Pricing " not in content:
        content = content.replace('import FAQ from "@/components/FAQ";', 'import FAQ from "@/components/FAQ";\nimport Pricing, { PricingPackage } from "@/components/Pricing";')
    elif "import { PricingPackage }" not in content:
        content = content.replace('import Pricing from', 'import Pricing, { PricingPackage } from')

    mapped_packages_code = """
  const pricingPackages: PricingPackage[] = [
    {
      title: "PAKET A",
      price: "1.199.000",
      strikePrice: "Rp 2.400.000",
      subLabel: "/ SEKALI PUBLIKASI",
      isPopular: false,
      buttonText: "Pilih Paket A",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket A Press Release. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [{ text: "<strong className=\\"font-extrabold text-gray-900\\">1–3 hari kerja</strong> sampai terbit", checked: true }]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Bebas pilih <strong className=\\"font-extrabold text-gray-900\\">1 media</strong> publikasi", checked: true },
            { text: "Berita terbit <strong className=\\"font-extrabold text-gray-900\\">permanen</strong>", checked: true },
            { text: "Garansi <strong className=\\"font-extrabold text-gray-900\\">100% tayang</strong>", checked: true },
            { text: "Laporan hasil publikasi", checked: true }
          ]
        },
        {
          title: "BONUS",
          items: [
            { text: "Potongan harga <strong className=\\"font-extrabold text-gray-900\\">Rp 200.000</strong>", checked: true },
            { text: "<strong className=\\"font-extrabold text-gray-900\\">100+ E-Course</strong> digital marketing", checked: true },
            { text: "<strong className=\\"font-extrabold text-gray-900\\">2.500+</strong> Template konten digital", checked: true },
            { text: "Kalender konten sosial media", checked: true }
          ]
        }
      ]
    },
    {
      title: "PAKET B",
      price: "4.999.000",
      strikePrice: "Rp 10.000.000",
      subLabel: "/ SEKALI PUBLIKASI",
      isPopular: true,
      buttonText: "Pilih Paket B",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket B Press Release. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [{ text: "<strong className=\\"font-extrabold text-gray-900\\">1–3 hari kerja</strong> sampai terbit", checked: true }]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Bebas pilih <strong className=\\"font-extrabold text-gray-900\\">5 media</strong> publikasi", checked: true },
            { text: "Berita terbit <strong className=\\"font-extrabold text-gray-900\\">permanen</strong>", checked: true },
            { text: "Garansi <strong className=\\"font-extrabold text-gray-900\\">100% tayang</strong>", checked: true },
            { text: "Laporan hasil publikasi", checked: true }
          ]
        },
        {
          title: "BONUS",
          items: [
            { text: "Potongan harga <strong className=\\"font-extrabold text-gray-900\\">Rp 200.000</strong>", checked: true },
            { text: "<strong className=\\"font-extrabold text-gray-900\\">100+ E-Course</strong> digital marketing", checked: true },
            { text: "<strong className=\\"font-extrabold text-gray-900\\">2.500+</strong> Template konten digital", checked: true },
            { text: "Kalender konten sosial media", checked: true }
          ]
        }
      ]
    },
    {
      title: "PAKET C",
      price: "8.999.000",
      strikePrice: "Rp 18.000.000",
      subLabel: "/ SEKALI PUBLIKASI",
      isPopular: false,
      buttonText: "Pilih Paket C",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket C Press Release. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [{ text: "<strong className=\\"font-extrabold text-gray-900\\">1–3 hari kerja</strong> sampai terbit", checked: true }]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Bebas pilih <strong className=\\"font-extrabold text-gray-900\\">10 media</strong> publikasi", checked: true },
            { text: "Berita terbit <strong className=\\"font-extrabold text-gray-900\\">permanen</strong>", checked: true },
            { text: "Garansi <strong className=\\"font-extrabold text-gray-900\\">100% tayang</strong>", checked: true },
            { text: "Laporan hasil publikasi", checked: true }
          ]
        },
        {
          title: "BONUS",
          items: [
            { text: "Potongan harga <strong className=\\"font-extrabold text-gray-900\\">Rp 200.000</strong>", checked: true },
            { text: "<strong className=\\"font-extrabold text-gray-900\\">100+ E-Course</strong> digital marketing", checked: true },
            { text: "<strong className=\\"font-extrabold text-gray-900\\">2.500+</strong> Template konten digital", checked: true },
            { text: "Kalender konten sosial media", checked: true }
          ]
        }
      ]
    }
  ];
"""

    return_idx = content.find("  return (")
    content = content[:return_idx] + mapped_packages_code + "\n" + content[return_idx:]

    pricing_section_replacement = """      {/* ─── 6. PRICING SECTION ─── */}
      <BottomPromoSection />
      <Pricing 
        sectionTitleTag="BIAYA JASA PRESS RELEASE"
        sectionTitle="Pilih paket sesuai target jangkauan."
        sectionSubtitle={
          <>
            Garansi 100% berita terbit & permanen online. Harga sudah termasuk biaya penerbitan di media yang dipilih.
          </>
        }
        packages={pricingPackages}
        footnotes={["Daftar lengkap media tersedia saat konsultasi — termasuk media nasional, ekonomi-bisnis, lifestyle, teknologi, & media daerah dengan tier rate berbeda."]}
      />
"""

    match_start = re.search(r'      {/\* ─── 6. PRICING SECTION ─── \*/}', content)
    match_end = re.search(r'      {/\* ─── 7. FAQ SECTION ─── \*/}', content)
    
    if match_start and match_end:
        content = content[:match_start.start()] + pricing_section_replacement + "\n" + content[match_end.start():]
        with open(filepath, 'w') as f:
            f.write(content)
        print("Press Release patched successfully")
    else:
        print("Could not find section boundaries")

if __name__ == "__main__":
    patch_pr("src/app/layanan/press-release/page.tsx")
