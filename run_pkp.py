import sys

pkg_data_str = """[
  {
    title: "PKP PULAU JAWA",
    price: "1.499.000",
    strikePrice: "3.000.000",
    subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
    isPopular: true,
    buttonText: "Pesan Sekarang",
    buttonLink: "https://wa.me/6281119289191?text=Halo%20EasyLegal%2C%20saya%20tertarik%20dengan%20Paket%20PKP%20Pulau%20Jawa.",
    groups: [
      {
        title: "LAMA PROSES",
        items: [{ text: "5-7 Hari Kerja", checked: true }]
      },
      {
        title: "YANG DIPEROLEH",
        items: [
          { text: "Konsultasi tentang PKP / PPN", checked: true },
          { text: "Pengecekan status wajib pajak", checked: true },
          { text: "Pendaftaran PKP ke DJP", checked: true },
          { text: "Persiapan & korespondensi survei PKP", checked: true },
          { text: "Pendampingan sertifikat elektronik", checked: true },
          { text: "Aktivasi e-Faktur", checked: true }
        ]
      },
      {
        title: "BONUS",
        items: [
          { text: "Personal Legal Assistance", checked: true },
          { text: "1 Kupon: <strong>Undian iPhone</strong>", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true }
        ]
      }
    ]
  },
  {
    title: "PKP LUAR JAWA",
    price: "2.499.000",
    strikePrice: "4.000.000",
    subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
    isPopular: false,
    buttonText: "Pesan Sekarang",
    buttonLink: "https://wa.me/6281119289191?text=Halo%20EasyLegal%2C%20saya%20tertarik%20dengan%20Paket%20PKP%20Luar%20Jawa.",
    groups: [
      {
        title: "LAMA PROSES",
        items: [{ text: "7-14 Hari Kerja", checked: true }]
      },
      {
        title: "YANG DIPEROLEH",
        items: [
          { text: "Konsultasi tentang PKP / PPN", checked: true },
          { text: "Pengecekan status wajib pajak", checked: true },
          { text: "Pendaftaran PKP ke DJP", checked: true },
          { text: "Persiapan & korespondensi survei PKP", checked: true },
          { text: "Pendampingan sertifikat elektronik", checked: true },
          { text: "Aktivasi e-Faktur", checked: true }
        ]
      },
      {
        title: "BONUS",
        items: [
          { text: "Personal Legal Assistance", checked: true },
          { text: "1 Kupon: <strong>Undian iPhone</strong>", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true }
        ]
      }
    ]
  }
]"""

import fix_pricing
fix_pricing.patch_file(
    "src/app/layanan/pengajuan-pkp/page.tsx", 
    pkg_data_str, 
    "BIAYA JASA DAFTAR PKP", 
    "2 paket sesuai lokasi kantor Anda.", 
    "Harga sudah include konsultasi, pendaftaran, pendampingan survei DJP, sampai aktivasi e-Faktur. Tanpa tambahan biaya apapun."
)
