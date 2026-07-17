import re

def reorder_nib(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Current sections in NIB:
    # 1. HERO
    # 2. APA ITU (Maybe)
    # 4. PRICING
    # 4.5. LAYANAN TAMBAHAN
    # 5. FAQ
    
    # Wait, let's look at NIB exact sections.
    # Earlier grep gave:
    # {/* ─── 1. HERO SECTION ─── */}
    # {/* ─── 4. PRICING SECTION ─── */}
    # {/* ─── 4.5. LAYANAN TAMBAHAN (Tabbed interactive section) ─── */}
    # {/* ─── 5. FAQ SECTION ─── */}
    
    # Oh! Is pricing ALREADY at the top? Let me check NIB exact sections again.
    s_biaya = content.find('      {/* ─── 4. PRICING SECTION ─── */}')
    s_hero_end = content.find('      {/* ─── 2.')
    if s_hero_end == -1: s_hero_end = content.find('      {/* ─── 3.')
    if s_hero_end == -1: s_hero_end = s_biaya
    
    s_faq = content.find('      {/* ─── 5. FAQ SECTION ─── */}')
    
    if s_biaya == -1 or s_faq == -1:
        print("Cannot find sections in NIB")
        return

    # If s_hero_end is actually BEFORE s_biaya, it means there is content before Biaya!
    if s_hero_end < s_biaya:
        block_hero = content[:s_hero_end]
        block_content = content[s_hero_end:s_biaya]
        block_biaya = content[s_biaya:s_faq]
        block_faq_cta = content[s_faq:]
        
        # Target order: Hero -> Biaya -> Content -> FAQ -> CTA
        new_content = block_hero + block_biaya + block_content + block_faq_cta
        
        with open(filepath, 'w') as f:
            f.write(new_content)
        print("NIB Reordered to match PT")
    else:
        print("NIB is already ordered correctly (Pricing is right after Hero)")

if __name__ == "__main__":
    reorder_nib("src/app/layanan/nib-oss/page.tsx")
