import re

def swap_lkpm(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The Pricing block is from {/* ─── 6. BIAYA JASA SECTION ─── */} to {/* ─── 7. ALUR PELAPORAN SECTION ─── */}
    # The Alur block is from {/* ─── 7. ALUR PELAPORAN SECTION ─── */} to {/* ─── 8. FAQ SECTION ─── */}
    
    pricing_start = content.find('          {/* ─── 6. BIAYA JASA SECTION ─── */}')
    alur_start = content.find('          {/* ─── 7. ALUR PELAPORAN SECTION ─── */}')
    faq_start = content.find('          {/* ─── 8. FAQ SECTION ─── */}')
    
    if pricing_start != -1 and alur_start != -1 and faq_start != -1:
        block_top = content[:pricing_start]
        block_pricing = content[pricing_start:alur_start]
        block_alur = content[alur_start:faq_start]
        block_bottom = content[faq_start:]
        
        # Change numbers in comments
        block_alur = block_alur.replace('7. ALUR PELAPORAN', '6. ALUR PELAPORAN')
        block_pricing = block_pricing.replace('6. BIAYA JASA', '7. BIAYA JASA')
        
        new_content = block_top + block_alur + block_pricing + block_bottom
        with open(filepath, 'w') as f:
            f.write(new_content)
        print("Swapped LKPM")
    else:
        print("LKPM sections not found")

if __name__ == "__main__":
    swap_lkpm("src/app/layanan/pelaporan-lkpm/page.tsx")
