# Knowledge Base — WhatsApp Conversion Tracking

**Terakhir diperbarui:** 2026-09-05

---

## Kode Konversi WhatsApp — Google Ads

### EL.ID

| Field | Value |
|-------|-------|
| **Nama Konversi** | `Kontak Whatsapp \| EL.ID 7984` |
| **Label Konversi** | `WnN8CL7mgPMYEPfovogq` |
| **ID Konversi** | `11292095607` |

### EL.CO.ID

| Field | Value |
|-------|-------|
| **Nama Konversi** | `Kontak Whatsapp \| EL.CO.ID 7895` |
| **Label Konversi** | `kFZwCMKnk4YZEM7d-Ywq` |
| **ID Konversi** | `11301449422` |

---

## Cara Kerja WhatsApp Tracking

1. **Klik tombol WhatsApp** → redirect ke `api.easylegal.my.id/api/v1/wa/redirect`
2. **API memilih nomor** terbaik (fewest clicks) dari pool yang aktif
3. **Log click** ke database (`WhatsAppClick` table)
4. **Generate lead code** unik (format: `EL-XXXXXX`)
5. **Redirect ke wa.me** dengan lead code di pesan

---

## Setup di GTM

### Tag: WhatsApp Click — Google Ads

```
Tag Type: Google Ads Conversion Tracking
Conversion ID: 11292095607 (EL.ID) / 11301449422 (EL.CO.ID)
Conversion Label: WnN8CL7mgPMYEPfovogq (EL.ID) / kFZwCMKnk4YZEM7d-Ywq (EL.CO.ID)
Trigger: Click — All Elements
  Filter: Click URL contains "wa.me" OR Click URL contains "whatsapp"
```

### Tag: WhatsApp Click — Meta

```
Tag Type: Custom HTML (Facebook Pixel)
Script:
  fbq('track', 'Contact', {
    content_name: 'WhatsApp Click',
    content_category: 'Lead Generation'
  });
Trigger: Click — Same as above
```

---

## Referensi

- **Admin Dashboard WhatsApp:** https://admin.easylegal.my.id/db → WhatsApp
- **WhatsApp Numbers:** Kelola nomor aktif
- **WhatsApp Pages:** Set autotext per halaman
- **WhatsApp Leads:** Lihat lead yang masuk dari klik WhatsApp
- **Config:** `apps/web-id/src/lib/config.ts`
- **API Routes:** `apps/api/src/routes/whatsapp.ts`
