import re

def patch_perkawinan(filepath):
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
      title: "PEMBUATAN PERJANJIAN",
      price: "3.999.000",
      strikePrice: "Rp 8.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Pembuatan Perjanjian",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Layanan Pembuatan Perjanjian Perkawinan. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES(1)",
          items: [{ text: "7–14 hari kerja", checked: true }]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Konsultasi Pisah Harta dengan ahli hukum keluarga", checked: true },
            { text: "Akta Perjanjian Pisah Harta di hadapan notaris", checked: true }
          ]
        },
        {
          title: "BONUS",
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "1 Kupon Undian iPhone", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          items: [
            { text: "Voucher EasyLegal Rp 250.000", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    },
    {
      title: "REGISTRASI KUA / DUKCAPIL",
      price: "1.999.000",
      strikePrice: "Rp 4.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: false,
      buttonText: "Pilih Registrasi Saja",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Layanan Registrasi Perjanjian Perkawinan. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES(2)",
          items: [{ text: "7–14 hari kerja", checked: true }]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: <div className="flex-1 grid grid-cols-12 gap-x-1"><span className="col-span-12 sm:col-span-6 font-semibold text-gray-700">Registrasi Perjanjian Pisah Harta di</span><span className="col-span-6 sm:col-span-3 font-bold text-gray-900">KUA Kota Bandung</span><span className="col-span-6 sm:col-span-3 text-gray-500 font-medium text-right sm:text-left sm:pl-1">(untuk Muslim)</span></div>, checked: true },
            { text: <div className="flex-1 grid grid-cols-12 gap-x-1"><span className="col-span-12 sm:col-span-6 font-semibold text-gray-700">Registrasi Perjanjian Pisah Harta di</span><span className="col-span-6 sm:col-span-3 font-bold text-gray-900">Dukcapil Kota Bandung</span><span className="col-span-6 sm:col-span-3 text-gray-500 font-medium text-right sm:text-left sm:pl-1">(untuk Non-Muslim)</span></div>, checked: true }
          ]
        },
        {
          title: "BONUS",
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "1 Kupon Undian iPhone", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          items: [
            { text: "Voucher EasyLegal Rp 250.000", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    }
  ];
"""

    return_idx = content.find("  return (")
    content = content[:return_idx] + mapped_packages_code + "\n" + content[return_idx:]

    pricing_section_replacement = """      {/* ─── 5. HARGA & PAKET SECTION ─── */}
      <BottomPromoSection />
      <Pricing 
        sectionTitleTag="BIAYA PERJANJIAN PERKAWINAN"
        sectionTitle="2 layanan — bisa pilih salah satu atau kombinasi."
        sectionSubtitle={
          <>
            Pembuatan akta & registrasi resmi bisa dipesan terpisah. Tim kami rekomendasikan keduanya untuk perlindungan hukum penuh.
          </>
        }
        packages={pricingPackages}
        footnotes={["(1) Estimasi waktu untuk drafting perjanjian & penandatanganan di hadapan notaris.", "(2) Estimasi waktu pendaftaran setelah Akta Notaris selesai. Tergantung jadwal KUA/Dukcapil setempat."]}
      />
"""

    match_start = re.search(r'      {/\* ─── 5. HARGA & PAKET SECTION ─── \*/}', content)
    match_end = re.search(r'      {/\* ─── 6. ALUR PROSES SECTION ─── \*/}', content)
    
    if match_start and match_end:
        content = content[:match_start.start()] + pricing_section_replacement + "\n" + content[match_end.start():]
        with open(filepath, 'w') as f:
            f.write(content)
        print("Perjanjian Perkawinan patched successfully")
    else:
        print("Could not find section boundaries")

if __name__ == "__main__":
    patch_perkawinan("src/app/layanan/perjanjian-perkawinan/page.tsx")
