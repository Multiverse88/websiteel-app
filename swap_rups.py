import re

def swap_rups(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The Pricing block is from {/* ─── 5. PAKET HARGA (MOVED HERE) ─── */} to {/* ─── 3. PROSES / TIMELINE ─── */}
    # The Alur block is from {/* ─── 3. PROSES / TIMELINE ─── */} to {/* ─── 4. FAQ ─── */}
    
    pricing_start = content.find('          {/* ─── 5. PAKET HARGA (MOVED HERE) ─── */}')
    alur_start = content.find('          {/* ─── 3. PROSES / TIMELINE ─── */}')
    faq_start = content.find('          {/* ─── 4. FAQ ─── */}')
    
    if pricing_start != -1 and alur_start != -1 and faq_start != -1:
        block_top = content[:pricing_start]
        block_pricing = content[pricing_start:alur_start]
        block_alur = content[alur_start:faq_start]
        block_bottom = content[faq_start:]
        
        new_content = block_top + block_alur + block_pricing + block_bottom
        with open(filepath, 'w') as f:
            f.write(new_content)
        print("Swapped RUPS")
    else:
        print("RUPS sections not found")

if __name__ == "__main__":
    swap_rups("src/app/layanan/pelaporan-rups/page.tsx")
