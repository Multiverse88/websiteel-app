import re

def reorder_lkpm(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # We need to extract blocks.
    # Current sections in LKPM:
    # 1. HERO
    # 2. PENGERTIAN
    # 3. PERIODE & BATAS WAKTU
    # 4. DATA YANG DILAPORKAN
    # 5. SANKSI
    # 6. ALUR PELAPORAN
    # 7. BIAYA JASA
    # 8. FAQ
    # 9. CTA

    s_hero_end = content.find('          {/* ─── 2. PENGERTIAN SECTION ─── */}')
    s_pengertian = s_hero_end
    
    # Wait, my previous swap script swapped Alur and Biaya, so now they are 6 and 7 respectively
    s_alur = content.find('          {/* ─── 6. ALUR PELAPORAN SECTION ─── */}')
    s_biaya = content.find('          {/* ─── 7. BIAYA JASA SECTION ─── */}')
    s_faq = content.find('          {/* ─── 8. FAQ SECTION ─── */}')
    
    if s_hero_end == -1 or s_alur == -1 or s_biaya == -1 or s_faq == -1:
        print("Cannot find sections in LKPM")
        return

    # Extract the blocks
    block_hero = content[:s_pengertian]
    block_content = content[s_pengertian:s_alur] # Pengertian, Periode, Data, Sanksi
    block_alur = content[s_alur:s_biaya]
    block_biaya = content[s_biaya:s_faq]
    block_faq_cta = content[s_faq:]
    
    # Target order: Hero -> Biaya -> Alur -> Content -> FAQ -> CTA
    new_content = block_hero + block_biaya + block_alur + block_content + block_faq_cta
    
    # Optional: We can fix the numbers in comments, but for now just reorder them
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print("LKPM Reordered to match PT")

if __name__ == "__main__":
    reorder_lkpm("src/app/layanan/pelaporan-lkpm/page.tsx")
