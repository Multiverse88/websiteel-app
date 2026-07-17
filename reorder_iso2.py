import re

def reorder_iso2(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The ISO file is currently:
    # 1. HERO
    # 1.5 TRUST SIGNALS
    # 1.6 VALUE PROPOSITION
    # 4. APA ITU SERTIFIKASI ISO
    # 4.5 MANFAAT SERTIFIKASI ISO
    # 5. PILIHAN LAYANAN SERTIFIKASI ISO
    # 3. PROSES SERTIFIKASI ISO
    # 2. HARGA PRICING GRID
    # 6. FAQ
    # 7. CTA
    
    # Let's extract the blocks.
    # We want: Hero, Trust, Value -> Harga -> Proses -> Apa Itu, Manfaat, Pilihan -> FAQ, CTA.
    
    # Find block starts
    s_apa_itu = content.find('      {/* ─── 4. APA ITU SERTIFIKASI ISO ─── */}')
    s_proses = content.find('      {/* ─── 3. PROSES SERTIFIKASI ISO (7 Langkah) ─── */}')
    s_harga = content.find('      {/* ─── 2. HARGA PRICING GRID (7 Paket) ─── */}')
    s_faq = content.find('      {/* ─── 6. FAQ SECTION (6 Tanya-Jawab Mockup) ─── */}')
    
    if s_apa_itu == -1 or s_proses == -1 or s_harga == -1 or s_faq == -1:
        print("Cannot find sections in ISO")
        return

    block_top = content[:s_apa_itu] # Hero, Trust, Value
    block_content = content[s_apa_itu:s_proses] # Apa Itu, Manfaat, Pilihan
    block_proses = content[s_proses:s_harga] # Proses
    block_harga = content[s_harga:s_faq] # Harga
    block_faq_cta = content[s_faq:] # FAQ, CTA
    
    # Target order: Hero -> Harga -> Proses -> Content -> FAQ -> CTA
    new_content = block_top + block_harga + block_proses + block_content + block_faq_cta
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print("ISO Reordered to match PT")

if __name__ == "__main__":
    reorder_iso2("src/app/layanan/sertifikasi-iso/page.tsx")
