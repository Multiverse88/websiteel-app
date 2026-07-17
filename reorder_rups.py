import re

def reorder_rups(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Current sections in RUPS:
    # 1. HERO
    # 2. APA ITU RUPS
    # 2.5. KENAPA INI PENTING
    # 2.6. PROMO BANNER
    # 3. PROSES / TIMELINE (Currently swapped to be before Harga)
    # 5. PAKET HARGA (Currently swapped to be after Proses)
    # 4. FAQ
    # CTA
    
    s_apa_itu = content.find('          {/* ─── 2. APA ITU RUPS ─── */}')
    
    # Wait, my previous swap changed the order to: PROSES then HARGA.
    # We need: HARGA then PROSES then CONTENT (APA ITU, KENAPA INI PENTING, PROMO BANNER)
    
    s_alur = content.find('          {/* ─── 3. PROSES / TIMELINE ─── */}')
    s_biaya = content.find('          {/* ─── 5. PAKET HARGA (MOVED HERE) ─── */}')
    s_faq = content.find('          {/* ─── 4. FAQ ─── */}')
    
    if s_apa_itu == -1 or s_alur == -1 or s_biaya == -1 or s_faq == -1:
        print("Cannot find sections in RUPS")
        return

    block_hero = content[:s_apa_itu]
    block_content = content[s_apa_itu:s_alur] # Apa itu, kenapa penting, promo
    block_alur = content[s_alur:s_biaya]
    block_biaya = content[s_biaya:s_faq]
    block_faq_cta = content[s_faq:]
    
    # Target order: Hero -> Biaya -> Alur -> Content -> FAQ -> CTA
    new_content = block_hero + block_biaya + block_alur + block_content + block_faq_cta
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print("RUPS Reordered to match PT")

if __name__ == "__main__":
    reorder_rups("src/app/layanan/pelaporan-rups/page.tsx")
