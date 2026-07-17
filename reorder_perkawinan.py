import re

def reorder_perkawinan(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Current sections:
    # 1. HERO
    # 2. PENJELASAN
    # 2.5. DOKUMEN PERSYARATAN
    # 5. ALUR PROSES (Swapped)
    # 6. HARGA & PAKET (Swapped)
    # 7. FAQ
    # 8. CTA
    
    s_penjelasan = content.find('      {/* ─── 2. PENJELASAN SECTION ─── */}')
    s_alur = content.find('      {/* ─── 5. ALUR PROSES SECTION ─── */}')
    s_biaya = content.find('      {/* ─── 6. HARGA & PAKET SECTION ─── */}')
    s_faq = content.find('      {/* ─── 7. FAQ SECTION ─── */}')
    
    if s_penjelasan == -1 or s_alur == -1 or s_biaya == -1 or s_faq == -1:
        print("Cannot find sections in Perkawinan")
        return

    block_hero = content[:s_penjelasan]
    block_content = content[s_penjelasan:s_alur] # Penjelasan, Dokumen
    block_alur = content[s_alur:s_biaya]
    block_biaya = content[s_biaya:s_faq]
    block_faq_cta = content[s_faq:]
    
    # Target order: Hero -> Biaya -> Alur -> Content -> FAQ -> CTA
    new_content = block_hero + block_biaya + block_alur + block_content + block_faq_cta
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print("Perkawinan Reordered to match PT")

if __name__ == "__main__":
    reorder_perkawinan("src/app/layanan/perjanjian-perkawinan/page.tsx")
