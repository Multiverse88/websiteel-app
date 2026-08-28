# Technical Plan — WhatsApp Lead Tracking & Attribution

Tanggal: 27 Agustus 2026

Status: Implementasi selesai pada branch `develop`; menunggu rollout

Dokumen produk: `docs/plans/2026-08-27-whatsapp-lead-attribution.md`

Sequence diagram: `docs/diagrams/whatsapp-lead-attribution-sequence.md`

## 1. Outcome teknis

Setelah fitur selesai:

- semua CTA yang menghubungi EasyLegal melalui WhatsApp melewati satu endpoint rotator;
- satu redirect WhatsApp menghasilkan satu Lead yang dapat dilacak;
- source, campaign, referral, entry point, CTA, dan layanan tersimpan;
- Lead Code dan Lead Source Code dibawa dalam pesan WhatsApp;
- CS dapat mengelola Lead sampai WON atau LOST;
- dashboard menampilkan funnel, cold/warm/hot, conversion, attribution, dan performa produk;
- direct WhatsApp link yang lolos dari tracking terdeteksi oleh automated test.

## 2. Temuan kondisi sekarang

Kode saat ini sudah mempunyai:

- helper `getWhatsAppLink()` pada `apps/web` dan `apps/web-co`;
- endpoint rotator `GET /api/v1/wa/redirect`;
- model `WhatsAppNumber` dan `WhatsAppClick`;
- pengaturan nomor dan fairness pada dashboard;
- prototipe lead tracking yang belum masuk `main` pada branch `develop`.

Gap yang ditemukan:

- `AnalyticsEvents.tsx` masih mencari URL rotator lama `mauorder.online`;
- terdapat direct `wa.me` pada Footer dan `BottomPromoSection` di kedua web;
- helper hanya menerima teks pesan, belum menerima context terstruktur;
- `WhatsAppClick` masih berfungsi sebagai log klik, belum menjadi domain Lead;
- belum ada history perubahan stage;
- belum ada Referral Code, attribution mentah, Entry Point, dan CTA Location terpisah;
- dashboard belum mempunyai workspace lead lengkap;
- belum ada test yang menggagalkan build ketika CTA EasyLegal melewati rotator.

Tautan `api.whatsapp.com` pada `SocialShare` bukan CTA ke EasyLegal. Itu fitur membagikan artikel melalui WhatsApp dan harus dikecualikan dari pembuatan Lead.

## 3. Pembagian module dan seam

Desain memakai module dalam agar aturan attribution dan lead tidak tersebar ke puluhan CTA.

### 3.1 Web Attribution Module

Lokasi usulan:

```text
apps/web/src/lib/attribution/
apps/web-co/src/lib/attribution/
  types.ts
  classify.ts
  storage.ts
  client.ts
```

Interface utama:

```ts
captureFirstTouch(location, referrer): AttributionSnapshot
readAttribution(): AttributionSnapshot | null
```

Implementation menyembunyikan parsing UTM, klasifikasi channel, cookie expiry, sanitasi, dan fallback. Call site tidak boleh menentukan channel sendiri.

### 3.2 WhatsApp Link Module

Memperdalam helper yang sudah ada:

```ts
getWhatsAppLink(input: {
  message: string
  service?: string
  ctaId?: string
  ctaLabel?: string
}): string
```

Compatibility overload sementara dapat menerima string lama agar migrasi CTA dilakukan bertahap. Interface final hanya menerima object supaya produk dan CTA tidak hilang.

### 3.3 Lead Creation Module

Lokasi usulan:

```text
apps/api/src/modules/leads/
  lead-types.ts
  attribution.ts
  lead-code.ts
  create-whatsapp-lead.ts
  transition-lead.ts
  lead-repository.ts
  lead-reporting.ts
```

Interface utama:

```ts
createWhatsAppLead(input): Promise<CreateLeadResult>
transitionLead(input): Promise<LeadDetail>
queryLeads(query): Promise<PaginatedLeads>
summarizeLeads(query): Promise<LeadSummary>
```

Route hanya memvalidasi HTTP, memanggil module, lalu memetakan hasil ke response/redirect. Pemilihan nomor, deduplikasi, pembuatan kode, transaction, attribution, dan event log berada di dalam module.

### 3.4 Dashboard Lead Module

Lokasi usulan:

```text
infra/admin-dashboard/src/features/leads/
  types.ts
  api.ts
  filters.ts
  LeadSummary.tsx
  LeadTable.tsx
  LeadDetailDrawer.tsx
  LeadTimeline.tsx
  StageEditor.tsx
```

`WhatsAppRotator.tsx` tetap fokus pada nomor dan fairness. Lead management menjadi halaman/module sendiri agar rotator tidak berubah menjadi halaman raksasa.

## 4. Fitur database

### DB-01 — Enum LeadStage

Nilai:

```text
NEW
CONTACTED
QUALIFIED
PROPOSAL
WON
LOST
```

Temperature tidak disimpan. API dan dashboard menghitung temperature dari stage.

### DB-02 — Enum AttributionChannel

Nilai:

```text
GOOGLE_ADS
META_ADS
ORGANIC_SEARCH
REFERRAL
DIRECT
OTHER
UNKNOWN
```

Mapping output untuk pesan WhatsApp bersifat canonical dan case-sensitive:

```text
GOOGLE_ADS      → gads
META_ADS        → metaads
ORGANIC_SEARCH  → googleseo
REFERRAL        → referral
DIRECT          → direct
OTHER           → other
UNKNOWN         → unknown
```

Database tetap memakai enum panjang agar query laporan mudah dipahami. Kode pendek dipakai sebagai `sourceCode` pada pesan WhatsApp dan response internal.

### DB-03 — Model Lead

Field minimum:

- `id`, `leadCode`, `stage`;
- `assignedNumberId`;
- `interestedService`;
- `entryUrl`, `entryPath`, `referrerUrl`;
- `ctaPath`, `ctaId`, `ctaLabel`;
- `channel`, `referralCode`;
- seluruh UTM, `gclid`, `fbclid`;
- `anonymousSessionId`, `deduplicationKey`;
- `notes`, `lostReason`;
- `orderValue`, `currency`;
- `createdAt`, `updatedAt`, `wonAt`, `lostAt`.

Index minimum:

- unique `leadCode`;
- `stage + createdAt`;
- `channel + createdAt`;
- `interestedService + createdAt`;
- `referralCode + createdAt`;
- `assignedNumberId + createdAt`;
- `deduplicationKey + createdAt`.

### DB-04 — Model LeadEvent

Append-only event untuk:

- `WHATSAPP_CTA_CLICKED`;
- `WHATSAPP_REDIRECTED`;
- `CONVERSATION_CONFIRMED`;
- `STAGE_CHANGED`;
- `NOTE_ADDED`;
- `LEAD_REOPENED`.

### DB-05 — Model LeadStageHistory

Menyimpan `fromStage`, `toStage`, `changedByUserId`, `reason`, dan timestamp.

### DB-06 — Model ReferralPartner dan ReferralLink

Disiapkan bila referral akan dikelola di dashboard:

- partner/name/status;
- referral code unik;
- campaign optional;
- target path;
- created/expired timestamps.

Versi MVP boleh menyimpan string `referralCode` pada Lead terlebih dahulu, tetapi schema tidak boleh menyamakan Referral Code dengan Lead Code.

### DB-07 — Migrasi data lama

- pertahankan `WhatsAppClick` sebagai click/event legacy atau migrasikan ke `LeadEvent`;
- backfill click lama menjadi Lead hanya bila mempunyai data yang cukup;
- data yang tidak dapat diklasifikasi memakai channel `UNKNOWN`;
- click counter dan relation nomor tidak boleh hilang;
- migration menyediakan rollback SQL atau backup/restore procedure.

## 5. Fitur API publik

### API-P01 — Create Lead melalui redirect

Endpoint:

```text
GET /api/v1/wa/redirect
```

Tanggung jawab:

1. validasi dan batasi panjang query;
2. normalisasi context;
3. klasifikasikan ulang channel di server;
4. cek deduplikasi 30 menit;
5. pilih nomor aktif dengan distribusi paling rendah;
6. generate Lead Code secara kriptografis;
7. insert Lead/event dan increment click counter dalam transaction;
8. mapping channel tervalidasi menjadi Lead Source Code;
9. bentuk pesan yang menampilkan Lead Code + Lead Source Code;
10. redirect `302` ke nomor hasil rotator.

Response tidak mengembalikan data Lead ke browser selain Lead Code dan Lead Source Code yang ada dalam pesan WhatsApp.

### API-P02 — Fail-open

Jika tracking/database gagal:

- log error dengan correlation ID;
- increment metric `wa_tracking_failure` jika telemetry tersedia;
- redirect ke nomor default;
- jangan menerima destination WA dari query parameter untuk mencegah open redirect.

### API-P03 — Rate limiting dan abuse protection

- rate limit per IP/session;
- batas query dan message length;
- whitelist enum;
- escape/sanitize teks pesan;
- jangan blok user normal karena double-click—gunakan deduplikasi.

## 6. Fitur API admin

Semua endpoint memakai `requireAuth`, role check, input schema validation, dan audit trail.

### API-A01 — List Lead

```text
GET /api/v1/wa/leads
```

Mendukung:

- cursor pagination;
- date range;
- search Lead Code;
- filter stage/temperature/channel/campaign/referral/service/number;
- sorting newest, oldest, updated, order value;
- server-side aggregation yang konsisten dengan filter.

### API-A02 — Detail Lead

```text
GET /api/v1/wa/leads/:id
```

Mengembalikan Lead, attribution, assigned number, stage history, dan events.

### API-A03 — Transition stage

```text
PATCH /api/v1/wa/leads/:id/stage
```

Aturan:

- validasi transition;
- LOST wajib `lostReason`;
- WON wajib `orderValue` jika keputusan bisnis menyetujuinya;
- set `wonAt` atau `lostAt` secara otomatis;
- append history dalam transaction;
- re-open LOST dicatat eksplisit.

### API-A04 — Update data operasional

```text
PATCH /api/v1/wa/leads/:id
```

Hanya menerima field yang boleh diedit: notes, interested service, owner/assignment, dan nilai order. Attribution awal bersifat read-only.

### API-A05 — Summary/reporting

```text
GET /api/v1/wa/leads/summary
```

Menghasilkan:

- count per stage/temperature;
- funnel;
- conversion rate;
- breakdown channel/campaign/referral/service/number;
- median time-to-contact dan time-to-close;
- total order value bila tersedia.

### API-A06 — Export CSV

Export mengikuti filter aktif, timezone Asia/Jakarta, dan melakukan CSV formula injection protection.

## 7. Fitur tracking website

Implementasi identik pada `apps/web` dan `apps/web-co`.

### WEB-01 — Capture first-touch

- mount sekali di root layout;
- baca UTM, gclid, fbclid, referrer, dan referral code;
- simpan first-party cookie 90 hari;
- simpan anonymous session ID non-invasif;
- jangan overwrite first-touch pada visit berikutnya.

### WEB-02 — Enrich CTA context

Setiap CTA mempunyai:

- stable `ctaId`, contoh `pricing-pt-complete`;
- `ctaLabel`;
- `interestedService`;
- current `ctaPath`.

Delegated click listener boleh melengkapi path/label, tetapi identitas produk sebaiknya diberikan secara eksplisit melalui helper.

### WEB-03 — Migrasi seluruh CTA EasyLegal

Wajib mengganti:

- Footer direct `wa.me`;
- `BottomPromoSection` direct `wa.me`;
- URL rotator lama;
- nomor hardcoded yang berfungsi sebagai CTA;
- handler `window.open` yang melewati helper.

Tidak diganti:

- WhatsApp Social Share karena tujuannya membagikan artikel ke kontak pengguna, bukan menghubungi EasyLegal.

### WEB-04 — CTA inventory test

Automated static test memindai kedua aplikasi dan gagal jika menemukan:

- direct `wa.me` selain allowlist SocialShare;
- `api.whatsapp.com` selain allowlist SocialShare;
- `mauorder.online`;
- nomor bisnis hardcoded dalam CTA;
- pemanggilan helper tanpa service/CTA context setelah compatibility period berakhir.

### WEB-05 — Analytics event

Push event ke GTM/GA4:

```text
cta_whatsapp_click
lead_redirect_success
lead_redirect_failure
```

Jangan mengirim Lead Code atau data personal ke GA4.

## 8. Fitur dashboard

### DASH-01 — Menu Lead Management

Tambahkan item navigasi `Leads WhatsApp`, terpisah dari `Rotator WhatsApp`.

### DASH-02 — Summary cards

- total Lead;
- NEW;
- COLD/WARM/HOT;
- WON dan LOST;
- conversion rate;
- total order value;
- median response time.

### DASH-03 — Funnel visualization

Visualisasi NEW → CONTACTED → QUALIFIED → PROPOSAL → WON/LOST dengan jumlah dan drop-off rate.

### DASH-04 — Attribution charts

- Lead per channel;
- conversion rate per channel;
- Lead per campaign/referral;
- Lead dan WON per service;
- tren harian/mingguan/bulanan.

### DASH-05 — Lead table

Fitur:

- pagination;
- multi-filter;
- pencarian Lead Code;
- sortable columns;
- temperature badge hasil turunan;
- empty/loading/error states;
- filter state tersimpan di URL.

### DASH-06 — Lead detail

Drawer atau page detail berisi:

- Lead Code dan stage;
- attribution lengkap;
- entry point dan CTA location;
- service dan assigned number;
- timeline history/events;
- notes;
- lost reason/order value;
- action update stage.

### DASH-07 — Stage editor

- hanya tampilkan transition valid;
- confirmation untuk WON/LOST;
- lost reason wajib;
- optimistic update hanya bila rollback error diterapkan;
- cegah double submit.

### DASH-08 — Export report

Download CSV sesuai date range dan filter dashboard.

### DASH-09 — Rotator tetap terpisah

Halaman rotator menangani:

- tambah nomor;
- aktif/nonaktif;
- fairness dan click share.

Lead management tidak ditanam seluruhnya ke file `WhatsAppRotator.tsx`.

## 9. Fitur referral management opsional

Jika referral dikelola pada fase pertama:

- CRUD Referral Partner;
- generate Referral Code unik;
- buat link dengan UTM/ref;
- copy/share referral link;
- status aktif/expired;
- summary Lead, WON, dan conversion per partner;
- export settlement report bila nanti ada komisi.

Komisi dan payout tidak termasuk scope awal kecuali aturan bisnisnya sudah tersedia.

## 10. Testing plan

### Unit tests

- klasifikasi Google Ads, Meta Ads, SEO, referral, direct, unknown;
- normalisasi UTM/referral;
- generator Lead Code dan collision retry;
- mapping stage → temperature;
- transition matrix;
- deduplication key/window;
- pembentukan WhatsApp message.
- mapping `GOOGLE_ADS → gads`, `META_ADS → metaads`, dan `ORGANIC_SEARCH → googleseo`;

### API integration tests

- redirect membuat Lead dan event secara atomik;
- nomor dipilih secara adil;
- duplicate click menggunakan Lead yang sama dalam window;
- DB failure melakukan fail-open;
- invalid query tidak disimpan;
- endpoint admin membutuhkan JWT;
- pagination/filter/summary konsisten;
- LOST/WON validation dan history.

### Web tests

- attribution tersimpan dan tidak tertimpa;
- setiap CTA category menuju rotator;
- CTA context sesuai halaman/produk;
- SocialShare tidak membuat Lead;
- browser tanpa cookie tetap bekerja;
- target blank tidak kehilangan context.

### Dashboard tests

- filter/pagination/search;
- update stage dan rollback error;
- required lost reason/order value;
- temperature badge;
- summary mengikuti filter tanggal;
- expired session kembali ke login.

### E2E smoke

Fixture minimal:

1. Google Ads URL → klik pricing PT → Lead `GOOGLE_ADS`, pesan berisi `Source: gads`, dan service benar;
2. Meta Ads URL → navigasi halaman lain → first-touch tetap `META_ADS` dan pesan berisi `Source: metaads`;
3. organic Google referrer → Lead `ORGANIC_SEARCH` dan pesan berisi `Source: googleseo`;
4. referral URL → referral code tersimpan;
5. direct visit → `DIRECT`;
6. CS mengubah NEW → CONTACTED → WON → dashboard HOT bertambah;
7. CS mengubah ke LOST → dashboard COLD dan lost reason benar.

## 11. Observability

Tambahkan structured logs dengan field:

- correlation ID;
- route/result;
- Lead ID internal, bukan full data visitor;
- channel;
- assigned number ID;
- error class;
- processing duration.

Metrics:

- `wa_redirect_total`;
- `wa_lead_created_total`;
- `wa_lead_deduplicated_total`;
- `wa_tracking_failure_total`;
- `wa_no_active_number_total`;
- API latency dan admin endpoint errors.

Alert awal: tracking failure rate lebih dari 2% selama 10 menit.

## 12. Deployment plan

Urutan aman:

1. backup database;
2. deploy migration yang backward-compatible;
3. deploy `admin-api`;
4. verifikasi redirect lama masih bekerja;
5. deploy `apps/web` dan `apps/web-co`;
6. verifikasi attribution dan CTA;
7. deploy `admin-dashboard`;
8. jalankan E2E production smoke;
9. pantau metrics dan logs;
10. hapus compatibility path hanya setelah data stabil.

Rollback:

- website dapat kembali mengirim request lama karena endpoint tetap backward-compatible;
- API lama tidak boleh dijalankan setelah schema destructive;
- jangan drop `WhatsAppClick` pada rilis pertama;
- migration cleanup dilakukan pada rilis terpisah.

## 13. Work breakdown dan urutan pengerjaan

### Sprint/Fase A — Foundation

- [ ] finalisasi business decision;
- [ ] inventaris CTA otomatis dan manual;
- [ ] buat types, transition map, dan attribution classifier;
- [ ] tambah unit tests merah terlebih dahulu.

### Sprint/Fase B — Database dan Lead Creation

- [ ] Prisma schema + migration;
- [ ] Lead Code generator;
- [ ] Lead Creation Module;
- [ ] transaction, deduplication, fail-open;
- [ ] API integration tests.

### Sprint/Fase C — Website Attribution

- [ ] first-touch module;
- [ ] helper WhatsApp context;
- [ ] migrasi seluruh CTA dua web;
- [ ] inventory guard test;
- [ ] web/E2E tests.

### Sprint/Fase D — Admin Operations

- [ ] admin list/detail/transition/summary endpoints;
- [ ] Lead dashboard module;
- [ ] table, filters, detail, stage editor;
- [ ] funnel dan attribution charts;
- [ ] CSV export.

### Sprint/Fase E — Rollout

- [ ] backup dan dry-run migration;
- [ ] staged deploy;
- [ ] production smoke;
- [ ] monitoring 24–48 jam;
- [ ] reconcile redirect count vs Lead count;
- [ ] dokumentasi operasional CS.

## 14. Definition of Done

- [ ] seluruh acceptance criteria produk terpenuhi;
- [ ] tidak ada CTA EasyLegal direct ke WhatsApp di luar allowlist;
- [ ] migration diuji pada salinan database;
- [ ] build API, kedua web, dan dashboard lulus;
- [ ] unit, integration, static inventory, dan E2E lulus;
- [ ] Lead Stage history tidak dapat hilang karena update biasa;
- [ ] dashboard summary konsisten dengan hasil query list;
- [ ] fail-open diuji dan terpantau;
- [ ] security review query input, auth, rate limit, dan export selesai;
- [ ] runbook CS dan rollback tersedia.

## 15. Keputusan sebelum coding

Default teknis yang direkomendasikan:

| Keputusan | Default |
|---|---|
| Attribution | First-touch 90 hari |
| Deduplikasi | Session + service + CTA, window 30 menit |
| HOT | Hanya stage WON |
| Order value | Disimpan saat WON |
| LOST | Wajib lost reason |
| Referral management | Schema-ready; UI setelah Lead MVP stabil |
| Lead owner | Nomor tujuan dulu; user/CS owner disiapkan nullable |
| Data legacy | Pertahankan dan tandai UNKNOWN |
| Branch awal | `develop`, lalu merge terkontrol ke `main` |

## 16. Estimasi scope relatif

| Area | Kompleksitas | Risiko utama |
|---|---|---|
| Database/migration | Tinggi | data lama dan compatibility |
| Public redirect | Tinggi | CTA tidak boleh mati |
| Attribution website | Tinggi | seluruh CTA dan dua web |
| Admin API | Sedang–tinggi | filter/agregasi/history |
| Dashboard | Tinggi | state, charts, filters, detail |
| Referral UI | Sedang | business rule belum lengkap |
| Testing/observability | Sedang–tinggi | menjaga akurasi analytics |

Implementasi sebaiknya tidak dilakukan sebagai satu commit besar. Setiap fase harus mempunyai migration/test/build yang dapat diverifikasi secara mandiri.
