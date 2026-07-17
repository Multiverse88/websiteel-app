import re

def reorder_pr(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Current sections:
    # 1. HERO
    # 2. PERBEDAAN / PENJELASAN
    # 3. KEBUTUHAN
    # 4. KENAPA PRESS RELEASE
    # 5. MEDIA PARTNER
    # 6. PRICING
    # 7. FAQ
    # 8. CTA
    
    s_content = content.find('      {/* ─── 2. PERBEDAAN / PENJELASAN SECTION ─── */}')
    s_biaya = content.find('      {/* ─── 6. PRICING SECTION ─── */}')
    s_faq = content.find('      {/* ─── 7. FAQ SECTION ─── */}')
    
    if s_content == -1 or s_biaya == -1 or s_faq == -1:
        print("Cannot find sections in PR")
        return

    block_hero = content[:s_content]
    block_content = content[s_content:s_biaya] # Perbedaan, Kebutuhan, Kenapa, Media
    block_biaya = content[s_biaya:s_faq]
    block_faq_cta = content[s_faq:]
    
    # Target order: Hero -> Biaya -> Content -> FAQ -> CTA (No Alur)
    new_content = block_hero + block_biaya + block_content + block_faq_cta
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print("PR Reordered to match PT")

if __name__ == "__main__":
    reorder_pr("src/app/layanan/press-release/page.tsx")
