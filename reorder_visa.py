import re

def reorder_visa(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Current sections:
    # 1. HERO
    # 2. PERBEDAAN
    # 3. PRICING
    # 4. FAQ
    # 5. CTA
    
    s_content = content.find('      {/* ─── 2. PERBEDAAN SECTION ─── */}')
    s_biaya = content.find('      {/* ─── 3. PRICING SECTION ─── */}')
    s_faq = content.find('      {/* ─── 4. FAQ SECTION ─── */}')
    
    if s_content == -1 or s_biaya == -1 or s_faq == -1:
        print("Cannot find sections in Visa")
        return

    block_hero = content[:s_content]
    block_content = content[s_content:s_biaya] # Perbedaan
    block_biaya = content[s_biaya:s_faq]
    block_faq_cta = content[s_faq:]
    
    # Target order: Hero -> Biaya -> Content -> FAQ -> CTA (No Alur)
    new_content = block_hero + block_biaya + block_content + block_faq_cta
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print("Visa Reordered to match PT")

if __name__ == "__main__":
    reorder_visa("src/app/layanan/visa-kitas/page.tsx")
