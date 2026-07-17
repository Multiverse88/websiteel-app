import re

def reorder_iso(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Define boundaries based on comments
    hero = content[:content.find('      {/* ─── 4. APA ITU SERTIFIKASI ISO ─── */}')] 
    # wait, the current order is: Hero -> Trust -> Value -> Harga -> Proses -> Apa Itu -> Manfaat -> Pilihan -> FAQ -> CTA
    
    # We need to extract them by their start index
    s_harga = content.find('      {/* ─── 2. HARGA PRICING GRID (7 Paket) ─── */}')
    s_proses = content.find('      {/* ─── 3. PROSES SERTIFIKASI ISO (7 Langkah) ─── */}')
    s_apa = content.find('      {/* ─── 4. APA ITU SERTIFIKASI ISO ─── */}')
    s_manfaat = content.find('      {/* ─── 4.5 MANFAAT SERTIFIKASI ISO ─── */}')
    s_pilihan = content.find('      {/* ─── 5. PILIHAN LAYANAN SERTIFIKASI ISO (7 Jenis) ─── */}')
    s_faq = content.find('      {/* ─── 6. FAQ SECTION (6 Tanya-Jawab Mockup) ─── */}')
    
    # Block 1: Up to Harga
    block_top = content[:s_harga]
    
    # Harga block (s_harga to s_proses)
    block_harga = content[s_harga:s_proses]
    
    # Proses block (s_proses to s_apa)
    block_proses = content[s_proses:s_apa]
    
    # Content block (s_apa to s_faq)
    block_content = content[s_apa:s_faq]
    
    # FAQ and bottom (s_faq to end)
    block_bottom = content[s_faq:]
    
    # New order: block_top -> block_content -> block_proses -> block_harga -> block_bottom
    new_content = block_top + block_content + block_proses + block_harga + block_bottom
    
    with open(filepath, 'w') as f:
        f.write(new_content)
        
    print("ISO Reordered!")

if __name__ == "__main__":
    reorder_iso("src/app/layanan/sertifikasi-iso/page.tsx")
