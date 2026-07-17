import re

file_path = "src/components/layanan/BadanUsahaTemplate.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add necessary imports
if 'import Testimonials' not in content:
    content = content.replace(
        'import MediaCoverage from "@/components/MediaCoverage";',
        'import MediaCoverage from "@/components/MediaCoverage";\nimport Testimonials from "@/components/home/Testimonials";\nimport BottomPromoSection from "@/components/home/BottomPromoSection";\nimport Benefits from "@/components/Benefits";'
    )

# Define Mengapa Pilih EasyLegal items
mengapa_pilih_kami = """
  const mengapaPilihKamiItems = [
    { title: "Praktis, Fleksibel & Cepat", desc: "Selesaikan semua urusan legalitas dari mana saja tanpa perlu mondar-mandir.", icon: <Clock className="w-5 h-5 stroke-[2]" /> },
    { title: "Biaya Hemat & Transparan", desc: "Tidak ada biaya tersembunyi. Semua biaya yang Anda bayarkan sudah termasuk biaya resmi pemerintah.", icon: <DollarSign className="w-5 h-5 stroke-[2]" /> },
    { title: "Keamanan Data Terjamin", desc: "Kerahasiaan data perusahaan Anda adalah prioritas utama kami dengan sistem yang sangat aman.", icon: <ShieldCheck className="w-5 h-5 stroke-[2]" /> },
    { title: "Gratis Konsultasi Legal", desc: "Tim ahli kami siap memberikan panduan hukum terbaik tanpa biaya tambahan untuk klien.", icon: <Handshake className="w-5 h-5 stroke-[2]" /> },
  ];
"""

if "mengapaPilihKamiItems" not in content:
    content = content.replace("const c = content;", mengapa_pilih_kami + "\n  const c = content;")

# Extract sections
hero_match = re.search(r'(<section className="bg-white pt-8 lg:pt-12 pb-16 lg:pb-24.*?)(?=<!-- ─── 2\. PENGERTIAN ─── -->|{\/\* ─── 2\. PENGERTIAN ─── \*\/})', content, re.DOTALL)
pengertian_match = re.search(r'({\/\* ─── 2\. PENGERTIAN ─── \*\/}.*?)(?=<!-- ─── 3\. MANFAAT ─── -->|{\/\* ─── 3\. MANFAAT ─── \*\/})', content, re.DOTALL)
manfaat_match = re.search(r'({\/\* ─── 3\. MANFAAT ─── \*\/}.*?)(?=<!-- ─── 4\. PAKET PRICING ─── -->|{\/\* ─── 4\. PAKET PRICING ─── \*\/})', content, re.DOTALL)
pricing_match = re.search(r'({\/\* ─── 4\. PAKET PRICING ─── \*\/}.*?)(?=<!-- ─── 5\. PROSES ─── -->|{\/\* ─── 5\. PROSES ─── \*\/})', content, re.DOTALL)
proses_match = re.search(r'({\/\* ─── 5\. PROSES ─── \*\/}.*?)(?=<!-- ─── 6\. FAQ ─── -->|{\/\* ─── 6\. FAQ ─── \*\/})', content, re.DOTALL)
faq_match = re.search(r'({\/\* ─── 6\. FAQ ─── \*\/}.*?)(?=<!-- ─── 7\. CTA BANNER ─── -->|{\/\* ─── 7\. CTA BANNER ─── \*\/})', content, re.DOTALL)
cta_match = re.search(r'({\/\* ─── 7\. CTA BANNER ─── \*\/}.*?)(?=<MediaCoverage \/>)', content, re.DOTALL)

if not (hero_match and pengertian_match and manfaat_match and pricing_match and proses_match and faq_match and cta_match):
    print("Could not match all sections!")
    exit(1)

# Assemble new order
new_structure = f"""
      {hero_match.group(1)}
      
      {{/* ─── 2. TRUST SIGNALS & MEDIA COVERAGE ─── */}}
      <MediaCoverage />

      {{/* ─── 3. VALUE PROPOSITION ─── */}}
      <Benefits sectionTitleTag="KEUNGGULAN KAMI" sectionTitle="Mengapa Pilih EasyLegal?" items={{mengapaPilihKamiItems}} />
      <BottomPromoSection />

      {pricing_match.group(1)}
      
      {proses_match.group(1)}

      {{/* ─── 7. TESTIMONIALS ─── */}}
      <Testimonials />

      {pengertian_match.group(1)}
      
      {manfaat_match.group(1)}
      
      {faq_match.group(1)}
      
      {cta_match.group(1)}
      </div>
"""

# Replace body starting from HERO
start_idx = hero_match.start()
# The end is right after <MediaCoverage />
end_idx = content.find("<MediaCoverage />") + len("<MediaCoverage />")

if end_idx < start_idx:
    print("Error finding boundaries")
    exit(1)

final_content = content[:start_idx] + new_structure.strip() + "\n" + content[end_idx:]
# The original content has '</div>\n      );\n}' at the end. Make sure we don't duplicate it or lose it.
# Our replacement ends right after cta_match which contains the closing section, but we manually added </div> which might duplicate.
final_content = final_content.replace("</div>\n      </div>\n      );\n}", "</div>\n      );\n}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(final_content)

print("Template updated successfully.")
