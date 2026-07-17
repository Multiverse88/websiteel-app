import os
import re

TARGET_PAGES = [
    'apostille',
    'nib-oss',
    'pendirian-yayasan',
    'pengajuan-pkp',
    'perjanjian-perkawinan',
    'press-release',
    'sertifikasi-iso',
    'virtual-office',
    'visa-kitas'
]

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
    
    boundaries = [m.start() for m in re.finditer(r'(?m)^[ \t]*(?:\{\/\*[ \t]*───|<MediaCoverage|<FAQ|<CTA)', inner_content)]
    
    print(f"\n--- {page} ---")
    for b in boundaries:
        line = inner_content[b:b+80].split('\n')[0].strip()
        print(line)

