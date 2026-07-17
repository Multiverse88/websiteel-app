import re

def reorder_apostille(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    s_hero_end = content.find('      {/* ─── 2. APA ITU APOSTILLE ─── */}')
    s_biaya = content.find('      {/* ─── 5. BIAYA JASA APOSTILLE (PRICING) ─── */}')
    s_syarat = content.find('      {/* ─── 7. SYARAT DOKUMEN ─── */}')
    
    if s_hero_end == -1 or s_biaya == -1 or s_syarat == -1:
        print("Cannot find sections in Apostille")
        return

    block_top = content[:s_hero_end] # Hero
    block_content = content[s_hero_end:s_biaya] # Apa Itu, Dokumen, Mengapa
    block_biaya_alur = content[s_biaya:s_syarat] # Biaya, Alur
    block_bottom = content[s_syarat:] # Syarat, Media, Sertifikasi, Transaksi, Testimoni, FAQ, CTA
    
    # Target order: Hero -> Biaya & Alur -> Content -> Bottom
    new_content = block_top + block_biaya_alur + block_content + block_bottom
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print("Apostille Reordered to match PT")

if __name__ == "__main__":
    reorder_apostille("src/app/layanan/apostille/page.tsx")
