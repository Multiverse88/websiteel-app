import re

def swap_perkawinan(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The Pricing block is from {/* ─── 5. HARGA & PAKET SECTION ─── */} to {/* ─── 6. ALUR PROSES SECTION ─── */}
    # The Alur block is from {/* ─── 6. ALUR PROSES SECTION ─── */} to {/* ─── 7. FAQ SECTION ─── */}
    
    pricing_start = content.find('      {/* ─── 5. HARGA & PAKET SECTION ─── */}')
    alur_start = content.find('      {/* ─── 6. ALUR PROSES SECTION ─── */}')
    faq_start = content.find('      {/* ─── 7. FAQ SECTION ─── */}')
    
    if pricing_start != -1 and alur_start != -1 and faq_start != -1:
        block_top = content[:pricing_start]
        block_pricing = content[pricing_start:alur_start]
        block_alur = content[alur_start:faq_start]
        block_bottom = content[faq_start:]
        
        # Change numbers in comments
        block_alur = block_alur.replace('6. ALUR PROSES', '5. ALUR PROSES')
        block_pricing = block_pricing.replace('5. HARGA & PAKET', '6. HARGA & PAKET')
        
        new_content = block_top + block_alur + block_pricing + block_bottom
        with open(filepath, 'w') as f:
            f.write(new_content)
        print("Swapped Perkawinan")
    else:
        print("Perkawinan sections not found")

if __name__ == "__main__":
    swap_perkawinan("src/app/layanan/perjanjian-perkawinan/page.tsx")
