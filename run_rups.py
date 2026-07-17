import re

def patch_rups(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Ensure Pricing is imported
    if "import Pricing " not in content:
        content = content.replace('import FAQ from "@/components/FAQ";', 'import FAQ from "@/components/FAQ";\nimport Pricing, { PricingPackage } from "@/components/Pricing";')
    elif "import { PricingPackage }" not in content:
        content = content.replace('import Pricing from', 'import Pricing, { PricingPackage } from')

    mapped_packages_code = """
  const pricingPackages: PricingPackage[] = packages.map((pkg, index) => ({
    title: pkg.name,
    price: pkg.price.replace("Rp ", ""),
    strikePrice: pkg.originalPrice,
    subLabel: pkg.badge,
    isPopular: index === 1,
    buttonText: pkg.buttonText,
    buttonLink: getWhatsAppLink(pkg.waText),
    groups: [
      {
        title: "LAMA PROSES",
        items: [{ text: pkg.duration, checked: true }]
      },
      {
        title: "YANG DIPEROLEH",
        items: pkg.obtained.map(item => ({ text: item, checked: true }))
      },
      {
        title: "BONUS",
        items: pkg.bonus.map(item => ({ text: item, checked: true }))
      },
      {
        title: "EXTRA BONUS",
        items: pkg.extraBonus.map(item => ({ text: item, checked: true }))
      }
    ]
  }));
"""

    return_idx = content.find("  return (")
    content = content[:return_idx] + mapped_packages_code + "\n" + content[return_idx:]

    pricing_section_replacement = """          {/* ─── 5. PAKET HARGA (MOVED HERE) ─── */}
          <FadeIn direction="up" delay={0.2}>
            <BottomPromoSection />
            <Pricing 
              sectionTitleTag="BIAYA JASA PELAPORAN RUPS"
              sectionTitle="Pilih paket sesuai jumlah KBLI Anda."
              sectionSubtitle={
                <>
                  Harga transparan tanpa biaya tersembunyi. Tim kami urus dari draft sampai bukti lapor resmi kementerian.
                </>
              }
              packages={pricingPackages}
              footnotes={["(1) Setelah Tanda Tangan Draft Akta dan Payment"]}
            />
          </FadeIn>
"""

    # First, replace the Pricing section in the Desktop block
    match_start = re.search(r'          {/\* ─── 5\. PAKET HARGA \(MOVED HERE\) ─── \*/}', content)
    match_end = re.search(r'          {/\* ─── 3\. PROSES / TIMELINE ─── \*/}', content)
    
    if match_start and match_end:
        content = content[:match_start.start()] + pricing_section_replacement + "\n" + content[match_end.start():]
    else:
        print("Could not find pricing section boundaries")
        return

    # Now we need to remove the MOBILE VIEW block completely.
    # The desktop block starts at:
    #       <div className="hidden lg:block">
    content = content.replace('      <div className="hidden lg:block">\n', '')

    # The mobile block starts at:
    #       {/* ─── MOBILE VIEW
    # Let's use regex to find the mobile view start
    mobile_start = re.search(r'      {/\* ─── MOBILE VIEW', content)
    if mobile_start:
        # Before mobile start, there's a </div> for the hidden block.
        # Let's find the closing `      </div>` right before the mobile start
        end_of_desktop = content.rfind('      </div>', 0, mobile_start.start())
        
        # The mobile view ends around line 1145, before `<MediaCoverage />`
        media_cov_idx = content.find('      <MediaCoverage />', mobile_start.start())
        if media_cov_idx != -1:
            # Remove from end_of_desktop to media_cov_idx
            content = content[:end_of_desktop] + "\n" + content[media_cov_idx:]
            
    with open(filepath, 'w') as f:
        f.write(content)
    print("Pelaporan RUPS patched successfully")

if __name__ == "__main__":
    patch_rups("src/app/layanan/pelaporan-rups/page.tsx")
