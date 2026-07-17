import re

def fix_rups(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The desktop block has an extra </div> because I removed <div className="hidden lg:block"> but didn't remove its </div> properly.
    # The mobile block starts at {/* ════════════════════════════════════════════
    mobile_start = re.search(r'      {/\* ════════════════════════════════════════════\n          MOBILE VIEW', content)
    
    if mobile_start:
        # We need to remove from the </div> right before mobile_start, all the way to just before the last </div> before `  );`
        # Let's find the closing tag for the page wrapper
        end_idx = content.rfind('    </div>\n  );')
        
        if end_idx != -1:
            # Let's find the extra </div> right before mobile_start
            desktop_end_idx = content.rfind('      </div>', 0, mobile_start.start())
            if desktop_end_idx != -1:
                # Remove from desktop_end_idx to end_idx
                content = content[:desktop_end_idx] + "\n" + content[end_idx:]
                with open(filepath, 'w') as f:
                    f.write(content)
                print("Fixed RUPS syntax error")
            else:
                print("Could not find desktop_end_idx")
        else:
            print("Could not find end_idx")
    else:
        print("Could not find mobile_start")

if __name__ == "__main__":
    fix_rups("src/app/layanan/pelaporan-rups/page.tsx")
