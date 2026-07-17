import re
import sys

def patch_file(filepath, pkg_data_str, section_title_tag, section_title, section_subtitle):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the Pricing section
    match = re.search(r'      {/\* ─── .*? PRICING .*? ─── \*/}', content, re.IGNORECASE)
    if not match:
        print(f"Could not find pricing section in {filepath}")
        return

    start_idx = match.start()
    
    # Find the next section
    match2 = re.search(r'      {/\* ─── \d+\..*? ─── \*/}', content[start_idx+10:])
    if not match2:
        end_idx = content.find('    </div>\n  );\n}')
    else:
        end_idx = start_idx + 10 + match2.start()

    # Ensure Pricing is imported
    if "import Pricing " not in content:
        content = content.replace('import FAQ from "@/components/FAQ";', 'import FAQ from "@/components/FAQ";\nimport Pricing from "@/components/Pricing";')
    if "import { PricingPackage } from" not in content:
        content = content.replace('import Pricing from "@/components/Pricing";', 'import Pricing, { PricingPackage } from "@/components/Pricing";')

    # Construct the replacement
    pricing_invocation = f"""{content[start_idx:start_idx+match.end()-start_idx]}
      <Pricing 
        sectionTitleTag="{section_title_tag}"
        sectionTitle="{section_title}"
        sectionSubtitle={{
          <>
            {section_subtitle}
          </>
        }}
        packages={{pricingPackages}}
      />

"""
    
    # Insert pricingPackages definition before return
    return_idx = content.find("  return (")
    new_content = content[:return_idx] + f"  const pricingPackages: PricingPackage[] = {pkg_data_str};\n\n" + content[return_idx:start_idx] + pricing_invocation + content[end_idx:]

    with open(filepath, 'w') as f:
        f.write(new_content)
    print(f"Patched {filepath}")
