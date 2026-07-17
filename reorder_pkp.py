import re

def reorder_pkp(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Current sections:
    # 1. HERO
    # 2. APA ITU
    # 3. WAJIB VS SUKARELA
    # 3.5. BENEFITS
    # 3.75. DOKUMEN PERSYARATAN
    # 4. PRICING
    # 5. FAQ
    # 6. CTA
    
    s_content = content.find('      {/* ─── 2. APA ITU PKP')
    s_biaya = content.find('      {/* ─── 4. PRICING SECTION ─── */}')
    s_faq = content.find('      {/* ─── 5. FAQ SECTION ─── */}')
    
    if s_content == -1 or s_biaya == -1 or s_faq == -1:
        print("Cannot find sections in PKP")
        return

    block_hero = content[:s_content]
    block_content = content[s_content:s_biaya] # Apa itu, Wajib, Benefits, Dokumen
    block_biaya = content[s_biaya:s_faq]
    block_faq_cta = content[s_faq:]
    
    # Target order: Hero -> Biaya -> Content -> FAQ -> CTA (No Alur)
    new_content = block_hero + block_biaya + block_content + block_faq_cta
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print("PKP Reordered to match PT")

if __name__ == "__main__":
    reorder_pkp("src/app/layanan/pengajuan-pkp/page.tsx")
