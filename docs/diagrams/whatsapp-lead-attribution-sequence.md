# Sequence Diagram WhatsApp Lead Tracking & Attribution

```mermaid
sequenceDiagram
    autonumber
    actor Visitor
    participant Browser as Browser / Attribution
    participant Web as EasyLegal Web
    participant API as Admin API / WA Rotator
    participant DB as PostgreSQL
    participant WA as WhatsApp
    actor CS as CS EasyLegal
    participant Dashboard as Admin Dashboard

    rect rgb(239, 246, 255)
        Note over Visitor,Browser: 1. First-touch attribution
        Visitor->>Web: Buka landing URL
        Note right of Visitor: UTM, gclid, fbclid, ref
        Web-->>Browser: Render halaman + attribution tracker
        Browser->>Browser: Deteksi channel
        Browser->>Browser: Simpan first-touch cookie 90 hari
        Note right of Browser: Entry URL, referrer, UTM,<br/>click ID, referral code
    end

    rect rgb(254, 242, 242)
        Note over Visitor,DB: 2. Klik CTA WhatsApp membuat Lead
        Visitor->>Browser: Klik CTA WhatsApp
        Note right of Visitor: Produk, konsultasi, pricing,<br/>sticky CTA, navbar, hero, footer
        Browser->>Browser: Gabungkan attribution + CTA context
        Note right of Browser: CTA path, CTA ID, label,<br/>interested service
        Browser->>API: GET /api/v1/wa/redirect + context

        API->>API: Validasi dan sanitasi context
        API->>DB: Cari nomor aktif dengan clickCount terendah
        DB-->>API: Nomor WhatsApp terpilih
        API->>API: Generate Lead ID + Lead Code
        API->>API: Mapping channel ke Lead Source Code
        Note right of API: GOOGLE_ADS → gads<br/>META_ADS → metaads<br/>ORGANIC_SEARCH → googleseo

        API->>DB: BEGIN TRANSACTION
        API->>DB: Insert Lead dengan stage NEW
        API->>DB: Simpan attribution + CTA context
        API->>DB: Simpan assignment nomor WhatsApp
        API->>DB: Tambah LeadEvent WHATSAPP_CTA_CLICKED
        API->>DB: Increment clickCount nomor
        API->>DB: COMMIT
        DB-->>API: Lead berhasil disimpan
    end

    alt Lead berhasil dibuat
        rect rgb(236, 253, 245)
            Note over Browser,CS: 3. Redirect dan percakapan WhatsApp
            API-->>Browser: HTTP 302 ke wa.me
            Note right of API: Pesan membawa<br/>[Ref: EL-A7K9Q2 | Source: gads]
            Browser->>WA: Buka chat dengan pesan terisi
            Visitor->>WA: Kirim pesan
            WA-->>CS: Pesan masuk ke nomor hasil rotator
        end
    else Tracking atau database gagal
        API->>API: Catat structured tracking error
        API-->>Browser: Fail-open ke nomor WA default
        Browser->>WA: Buka chat tanpa mematikan CTA
        Note over API,DB: tracking_failure masuk rekonsiliasi
    end

    rect rgb(253, 242, 248)
        Note over CS,Dashboard: 4. Pemrosesan Lead oleh CS
        CS->>Dashboard: Cari Lead Code dari pesan
        Dashboard->>API: GET /api/v1/wa/leads/:id
        API->>DB: Ambil Lead + attribution + history
        DB-->>API: Detail Lead
        API-->>Dashboard: Tampilkan detail Lead

        CS->>Dashboard: Ubah stage / notes / outcome
        Note right of CS: NEW → CONTACTED → QUALIFIED<br/>→ PROPOSAL → WON atau LOST
        Dashboard->>API: PATCH validated stage transition
        API->>DB: Update Lead
        API->>DB: Append LeadStageHistory
        API->>DB: Append LeadEvent STAGE_CHANGED
        DB-->>API: Update berhasil
        API-->>Dashboard: Refresh Lead dan funnel
    end

    rect rgb(255, 251, 235)
        Note over API,Dashboard: 5. Pelaporan dan analitik
        Dashboard->>API: GET leads summary + filters
        API->>DB: Agregasi stage, channel, campaign, produk
        DB-->>API: Hasil agregasi
        API-->>Dashboard: Funnel dan conversion metrics
        Note right of Dashboard: COLD = NEW atau LOST<br/>WARM = CONTACTED/QUALIFIED/PROPOSAL<br/>HOT = WON/closing
    end
```

## Aturan Identitas

- **Lead ID**: identitas internal database.
- **Lead Code**: kode publik per percakapan, misalnya `EL-A7K9Q2`.
- **Lead Source Code**: kode sumber ringkas dalam pesan, misalnya `gads`, `metaads`, atau `googleseo`.
- **Referral Code**: kode partner atau campaign, misalnya `PARTNER-BUDI`.
- Lead Code, Lead Source Code, dan Referral Code tidak boleh dipakai bergantian.

## Mapping Temperature

```mermaid
stateDiagram-v2
    [*] --> NEW: CTA WhatsApp diklik
    NEW --> CONTACTED: Percakapan dikonfirmasi
    NEW --> LOST: Tidak merespons / tidak valid
    CONTACTED --> QUALIFIED: Kebutuhan teridentifikasi
    CONTACTED --> LOST: Tidak lanjut
    QUALIFIED --> PROPOSAL: Penawaran diberikan
    QUALIFIED --> LOST: Tidak cocok
    PROPOSAL --> WON: Order / closing
    PROPOSAL --> LOST: Batal / memilih kompetitor
    LOST --> CONTACTED: Lead dibuka kembali

    note right of NEW
        Temperature: COLD
    end note
    note right of CONTACTED
        Temperature: WARM
    end note
    note right of QUALIFIED
        Temperature: WARM
    end note
    note right of PROPOSAL
        Temperature: WARM
    end note
    note right of WON
        Temperature: HOT
    end note
    note right of LOST
        Temperature: COLD
    end note
```
