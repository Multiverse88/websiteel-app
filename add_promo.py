import re
import os
import glob

# Files to update
files = glob.glob("src/app/layanan/*/page.tsx")

import_statement = 'import Image from "next/image";\n'

for filepath in files:
    with open(filepath, "r") as f:
        content = f.read()
    
    if 'id="paket-harga"' not in content:
        continue
        
    if "promo-50.png" in content:
        print(f"Already updated {filepath}")
        continue
        
    print(f"Updating {filepath}...")
    
    # First, make sure Image is imported
    if "import Image from" not in content:
        # Find the last import
        imports = list(re.finditer(r'^import .*?;$', content, re.MULTILINE))
        if imports:
            last_import = imports[-1]
            content = content[:last_import.end()] + "\n" + import_statement + content[last_import.end():]
            
    # Then find the header div for the pricing section
    # Usually it looks like: <div className="text-center max-w-3xl ... mb-8 ..."> ... </div>
    # It comes right after <section id="paket-harga"...> or <div className="max-w-[...px] mx-auto...">
    
    # We can look for the div containing the text uppercase tracking... or font-heading
    # Better yet, let's find the section id="paket-harga", then the inner container, then the header div.
    
    pattern = re.compile(
        r'(<section[^>]*id="paket-harga"[^>]*>.*?<div[^>]*max-w-\[[^\]]+\][^>]*>)\s*<div className="([^"]*text-center[^"]*max-w-[^"]*mb-[^"]*space-y-[^"]*)"([^>]*)>(.*?)(?=<\s*div\s+className="grid|<div className="max-w-4xl mx-auto)',
        re.DOTALL
    )
    
    def replacer(match):
        prefix = match.group(1)
        classes = match.group(2)
        other_attrs = match.group(3)
        inner_html = match.group(4)
        
        # We need to change text-center and max-w-* and mx-auto
        # Actually, let's just replace the class entirely to our flex layout
        
        new_classes = "mb-8 sm:mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-10"
        
        # For the inner text part, we wrap it in a max-w-2xl text-left div
        new_inner = f"""
            <div className="max-w-2xl space-y-2 sm:space-y-3">
              {inner_html.strip()}
            </div>
            <div className="flex-shrink-0 flex justify-start md:justify-end">
              <Image 
                src="/images/badges/promo-50.png" 
                alt="Promo 50% Off Legal Deals" 
                width={{280}} 
                height={{120}}
                className="w-[220px] sm:w-[280px] object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
"""
        return f'{prefix}\n          <div className="{new_classes}"{other_attrs}>{new_inner}          </div>\n\n          '
    
    new_content, count = pattern.subn(replacer, content, count=1)
    if count > 0:
        with open(filepath, "w") as f:
            f.write(new_content)
        print(f"Success {filepath}")
    else:
        print(f"Failed to match regex in {filepath}")
