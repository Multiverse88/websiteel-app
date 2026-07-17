import os
import re

TARGET_PAGES = [
    'apostille',
    'nib-oss',
    'pelaporan-lkpm',
    'pelaporan-rups',
    'pendirian-yayasan',
    'pengajuan-pkp',
    'perjanjian-perkawinan',
    'press-release',
    'sertifikasi-iso',
    'virtual-office',
    'visa-kitas'
]

def get_category(content):
    upper = content.upper()
    header_lines = "\n".join(content.strip().split("\n")[:5])
    
    if 'HERO' in header_lines: return 1
    if '<MEDIACOVERAGE' in header_lines: return 2
    if 'MANFAAT' in header_lines or 'KEUNGGULAN' in header_lines or 'MENGAPA' in header_lines or 'KENAPA' in header_lines: return 3
    if 'PRICING' in header_lines or 'HARGA' in header_lines or 'BIAYA' in header_lines or 'PAKET' in header_lines: return 4
    if 'TAMBAHAN' in header_lines: return 5
    if 'PROSES' in header_lines or 'ALUR' in header_lines or 'SYARAT' in header_lines or 'DOKUMEN' in header_lines or 'CARA KERJA' in header_lines or 'TIMELINE' in header_lines or 'LANGKAH' in header_lines: return 6
    if 'TESTIMONI' in header_lines: return 7
    if '<FAQ' in header_lines or 'FAQ' in header_lines: return 9
    if 'CTA' in header_lines or 'TRANSAKSI AMAN' in header_lines: return 10
    
    # Otherwise it's educational content like "Apa itu...", "Perbedaan...", "Kebutuhan...", etc.
    return 8

base_dir = "src/app/layanan"

for page in TARGET_PAGES:
    file_path = os.path.join(base_dir, page, "page.tsx")
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the main return block
    # We'll look for: return ( \n <div ...>
    # and its matching closing </div>
    
    match = re.search(r'return\s*\(\s*(<div[^>]*>)', content)
    if not match:
        print(f"Skipping {page}, no main div found.")
        continue
        
    start_idx = match.end()
    # Find the last </div> before the end of the file
    end_idx = content.rfind('</div>')
    
    if end_idx == -1 or end_idx < start_idx:
        print(f"Skipping {page}, could not find end div.")
        continue
        
    inner_content = content[start_idx:end_idx]
    
    # We will split inner_content by looking for section boundaries.
    # A boundary is typically `      {/* ─── ` or `      <MediaCoverage />` or `      <FAQ `
    # Let's find all indices where a section starts.
    # It must be at the beginning of a line (with optional spaces).
    
    boundaries = [m.start() for m in re.finditer(r'(?m)^[ \t]*(?:\{\/\*[ \t]*───|<\w+[^>]*>|<\w+\s+[\s\S]*?/>)', inner_content)]
    
    # We need to be careful not to split inside nested divs.
    # It is safer to split specifically on:
    # 1. `{/* ─── `
    # 2. `<MediaCoverage`
    # 3. `<FAQ`
    # Let's use this regex:
    boundaries = [m.start() for m in re.finditer(r'(?m)^[ \t]*(?:\{\/\*[ \t]*───|<MediaCoverage|<FAQ)', inner_content)]
    
    if not boundaries:
        print(f"Skipping {page}, no sections found.")
        continue
        
    if boundaries[0] != 0:
        # Pre-content (e.g. empty lines or top padding)
        sections = [inner_content[0:boundaries[0]]]
    else:
        sections = []
        
    for i in range(len(boundaries)):
        start = boundaries[i]
        end = boundaries[i+1] if i+1 < len(boundaries) else len(inner_content)
        sections.append(inner_content[start:end])
        
    # We should keep the pre-content at the very beginning
    pre_content = ""
    if len(sections) > 0 and not re.search(r'(?m)^[ \t]*(?:\{\/\*[ \t]*───|<MediaCoverage|<FAQ)', sections[0]):
        pre_content = sections[0]
        sections = sections[1:]
        
    # Sort sections based on category
    # But wait, pelaporan-lkpm has DESKTOP VIEW and MOBILE VIEW wrapper comments!
    # If the file has 'DESKTOP VIEW', we skip automated reordering to avoid breaking it!
    if 'DESKTOP VIEW' in inner_content:
        print(f"Skipping {page}, contains DESKTOP VIEW wrapper.")
        continue

    sorted_sections = sorted(sections, key=get_category)
    
    new_inner = pre_content + "".join(sorted_sections)
    new_content = content[:start_idx] + new_inner + content[end_idx:]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    
    print(f"Successfully reordered {page}")

