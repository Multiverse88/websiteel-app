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
    
    if 'HERO' in header_lines: return 10
    if 'MEDIACOVERAGE' in upper or 'LIPUTAN MEDIA' in header_lines: return 20
    if 'SERTIFIKASI' in header_lines: return 30
    if 'MANFAAT' in upper or 'KEUNGGULAN' in upper or 'MENGAPA' in upper or 'KENAPA' in upper or 'Bukan Ditangani' in content: return 40
    if 'PRICING' in header_lines or 'HARGA' in header_lines or 'BIAYA' in header_lines or 'PAKET' in header_lines: return 50
    if 'TAMBAHAN' in header_lines: return 55
    if 'PROSES' in upper or 'ALUR' in upper or 'SYARAT' in upper or 'DOKUMEN' in upper or 'CARA KERJA' in upper or 'TIMELINE' in upper or 'LANGKAH' in upper: return 60
    if 'TESTIMONI' in upper: return 70
    
    # Notice: the CTA BANNER in nib-oss might contain "PROSES" or "SYARAT" in the body?
    # YES! "CTA BANNER (Mockup Clean White)" might contain the word "PROSES" because the CTA says "Proses cepat".
    # And since 'PROSES' in upper is checked BEFORE 'CTA', it gets priority 60!
    
    if '<FAQ' in upper or 'FAQ' in upper: return 90
    if '<CTA' in upper or 'CTA' in header_lines or 'TRANSAKSI AMAN' in upper or 'MARKETPLACE' in upper: return 100
    
    return 80

print("This is the reason!")
