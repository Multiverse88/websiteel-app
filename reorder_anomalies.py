import os
import re

TARGET_PAGES = [
    'apostille',
    'nib-oss',
    'pengajuan-pkp',
]

def get_category(content):
    upper = content.upper()
    header_lines = "\n".join(upper.strip().split("\n")[:8])
    
    # 1. Atensi
    if 'HERO' in header_lines: return 10
    if 'MEDIACOVERAGE' in upper or 'LIPUTAN MEDIA' in header_lines: return 20
    if 'SERTIFIKASI' in header_lines: return 30
    
    # 2. Interest
    if 'MANFAAT' in upper or 'KEUNGGULAN' in upper or 'MENGAPA' in upper or 'KENAPA' in upper or 'Bukan Ditangani' in content: return 40
    
    # 3. Desire
    if 'PRICING' in header_lines or 'HARGA' in header_lines or 'BIAYA' in header_lines or 'PAKET' in header_lines: return 50
    if 'TAMBAHAN' in header_lines: return 55
    if 'PROSES' in upper or 'ALUR' in upper or 'SYARAT' in upper or 'DOKUMEN' in upper or 'CARA KERJA' in upper or 'TIMELINE' in upper or 'LANGKAH' in upper: return 60
    if 'TESTIMONI' in upper: return 70
    
    # 4. Action
    if '<FAQ' in upper or 'FAQ' in upper: return 90
    if '<CTA' in upper or 'CTA' in header_lines or 'TRANSAKSI AMAN' in upper or 'MARKETPLACE' in upper: return 100
    
    # Edukasi (default)
    return 80

base_dir = "src/app/layanan"

for page in TARGET_PAGES:
    file_path = os.path.join(base_dir, page, "page.tsx")
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r'return\s*\(\s*(<div[^>]*>)', content)
    if not match: continue
        
    start_idx = match.end()
    end_idx = content.rfind('</div>')
    
    if end_idx == -1 or end_idx < start_idx: continue
        
    inner_content = content[start_idx:end_idx]
    
    # Safely split!
    # We will split on `{/* ───`, `<MediaCoverage`, `<FAQ`, `<CTA`
    # BUT we don't want to separate `{/* ─── 11. FAQ ─── */}` from `<FAQ` if they are next to each other!
    # So let's first clean up standalone `{/* ─── 11. FAQ ─── */}` by just splitting on the regex.
    boundaries = [m.start() for m in re.finditer(r'(?m)^[ \t]*(?:\{\/\*[ \t]*───|<MediaCoverage|<FAQ|<CTA)', inner_content)]
    
    if not boundaries: continue
        
    sections = []
    if boundaries[0] != 0:
        sections.append(inner_content[0:boundaries[0]])
        
    for i in range(len(boundaries)):
        start = boundaries[i]
        end = boundaries[i+1] if i+1 < len(boundaries) else len(inner_content)
        chunk = inner_content[start:end]
        sections.append(chunk)
        
    # We need to merge consecutive fragments that belong together (like FAQ comment + FAQ tag)
    merged_sections = []
    for sec in sections:
        if not sec.strip():
            continue
        if sec.strip().startswith('{/*') and '<' not in sec:
            # It's a dangling comment block? We might want to attach it to the next chunk
            pass
            
    # For simplicity, we just sort them. A dangling `{/* FAQ */}` will get priority 90, 
    # `<FAQ>` will get priority 90. Since it's stable sort, they will stay together!
    
    pre_content = ""
    if len(sections) > 0 and not re.search(r'(?m)^[ \t]*(?:\{\/\*[ \t]*───|<MediaCoverage|<FAQ|<CTA)', sections[0]):
        pre_content = sections[0]
        sections = sections[1:]
        
    sorted_sections = sorted(sections, key=get_category)
    
    new_inner = pre_content + "".join(sorted_sections)
    new_content = content[:start_idx] + new_inner + content[end_idx:]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    
    print(f"Fixed {page}")

