import re

with open("src/data/layanan-badan-usaha.tsx", "r") as f:
    content = f.read()

# For each PT, CV, Firma, etc., we want to replace heroImage and pengertianImage.
# Let's see all 'id' fields to know what keys to use.
ids = re.findall(r'id:\s*"([^"]+)"', content)
print("Found IDs:", ids)

# Mapping of id to image prefixes based on filenames
# pt -> pt-1, pt-2
# pt-pma -> pt-pma-1, pt-pma-2
# pt-perorangan -> pt-perorangan-1, pt-perorangan-2
# cv -> cv-1, cv-2
# firma -> firma-1, firma-2
# yayasan -> yayasan-1, yayasan-2
# koperasi -> koperasi-1, koperasi-2
# perkumpulan -> perkumpulan-1, perkumpulan-2

extensions = {
    "pt-1": ".jpg", "pt-2": ".jpg",
    "pt-pma-1": ".jpg", "pt-pma-2": ".png",
    "pt-perorangan-1": ".jpg", "pt-perorangan-2": ".jpg",
    "cv-1": ".jpg", "cv-2": ".jpg",
    "firma-1": ".jpg", "firma-2": ".jpg",
    "yayasan-1": ".jpg", "yayasan-2": ".jpg",
    "koperasi-1": ".jpg", "koperasi-2": ".png",
    "perkumpulan-1": ".jpg", "perkumpulan-2": ".jpg"
}

for i in ids:
    img1 = f"/images/layanan/{i}-1{extensions.get(f'{i}-1', '.jpg')}"
    img2 = f"/images/layanan/{i}-2{extensions.get(f'{i}-2', '.jpg')}"
    
    # We need to replace heroImage and pengertianImage in the block for this id.
    # We can use regex to find the block for each id and replace it.
    
    pattern = r'(id:\s*"' + i + r'".*?heroImage:\s*")[^"]+(".*?pengertianImage:\s*")[^"]+(")'
    
    def repl(m):
        return m.group(1) + img1 + m.group(2) + img2 + m.group(3)
        
    content, count = re.subn(pattern, repl, content, flags=re.DOTALL | re.MULTILINE)
    print(f"Replaced images for {i}: {count} times")

with open("src/data/layanan-badan-usaha.tsx", "w") as f:
    f.write(content)
