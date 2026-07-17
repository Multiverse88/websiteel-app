import re

def patch_lkpm(filepath):
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
      title: "MIKRO KECIL",
      price: "1.499.000",
      strikePrice: "Rp 3.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih LKPM Mikro Kecil",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket LKPM Mikro Kecil. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [{ text: "1-3 hari kerja", checked: true }]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "<strong className=\\"font-extrabold text-gray-900\\">Tanda Terima Pelaporan LKPM</strong> dari sistem OSS BKPM", checked: true }
          ]
        },
        {
          title: "BONUS",
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "<strong className=\\"font-extrabold text-gray-900\\">1 Kupon</strong> Undian iPhone", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          items: [
            { text: "Voucher EasyLegal <strong className=\\"font-extrabold text-gray-900\\">Rp 250.000</strong>", checked: true },
            { text: "Dokumen SOP Karyawan & SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    },
    {
      title: "MENENGAH BESAR",
      price: "2.499.000",
      strikePrice: "Rp 5.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: false,
      buttonText: "Pilih LKPM Menengah Besar",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket LKPM Menengah Besar. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [{ text: "1-3 hari kerja", checked: true }]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "<strong className=\\"font-extrabold text-gray-900\\">Tanda Terima Pelaporan LKPM</strong> dari sistem OSS BKPM", checked: true }
          ]
        },
        {
          title: "BONUS",
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "<strong className=\\"font-extrabold text-gray-900\\">1 Kupon</strong> Undian iPhone", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          items: [
            { text: "Voucher EasyLegal <strong className=\\"font-extrabold text-gray-900\\">Rp 250.000</strong>", checked: true },
            { text: "Dokumen SOP Karyawan & SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    }
  ];
"""

    return_idx = content.find("  return (")
    content = content[:return_idx] + mapped_packages_code + "\n" + content[return_idx:]

    pricing_section_replacement = """          {/* ─── 6. BIAYA JASA SECTION ─── */}
          <FadeIn direction="up" delay={0.2}>
            <BottomPromoSection />
            <Pricing 
              sectionTitleTag="BIAYA JASA PELAPORAN LKPM"
              sectionTitle="2 paket sesuai skala usaha Anda."
              sectionSubtitle={
                <>
                  Pilih paket berdasarkan kategori UMK atau Menengah-Besar. Harga sudah termasuk konsultasi, pengisian, & submit ke OSS.
                </>
              }
              packages={pricingPackages}
            />
          </FadeIn>
"""

    # First, replace the Pricing section in the Desktop block
    match_start = re.search(r'          {/\* ─── 6. BIAYA JASA SECTION ─── \*/}', content)
    match_end = re.search(r'          {/\* ─── 7. ALUR PELAPORAN SECTION ─── \*/}', content)
    
    if match_start and match_end:
        content = content[:match_start.start()] + pricing_section_replacement + "\n" + content[match_end.start():]
    else:
        print("Could not find pricing section boundaries")
        return

    # Now we need to remove the MOBILE VIEW block completely.
    # The desktop block starts at:
    #       {/* ─── DESKTOP VIEW (Visible on LG screens and larger) ─── */}
    #       <div className="hidden lg:block">
    content = content.replace('      {/* ─── DESKTOP VIEW (Visible on LG screens and larger) ─── */}\n      <div className="hidden lg:block">\n', '')

    # The mobile block starts at:
    #       {/* ─── MOBILE VIEW (Visible on mobile and tablet) ─── */}
    mobile_start = re.search(r'      {/\* ─── MOBILE VIEW \(Visible on mobile and tablet\) ─── \*/}', content)
    if mobile_start:
        # And before mobile_start, there should be a `      </div>` to close the `hidden lg:block`.
        # Let's find the `      </div>\n\n` right before mobile_start.
        end_of_desktop = content.rfind('      </div>', 0, mobile_start.start())
        
        # The mobile view ends around line 2235, before `<MediaCoverage />`
        # Let's search for `<MediaCoverage />`
        media_cov_idx = content.find('      <MediaCoverage />', mobile_start.start())
        if media_cov_idx != -1:
            # We want to remove from end_of_desktop all the way to media_cov_idx
            content = content[:end_of_desktop] + "\n" + content[media_cov_idx:]
            
    with open(filepath, 'w') as f:
        f.write(content)
    print("Pelaporan LKPM patched successfully")

if __name__ == "__main__":
    patch_lkpm("src/app/layanan/pelaporan-lkpm/page.tsx")
