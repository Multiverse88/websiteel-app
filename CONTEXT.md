# EasyLegal

EasyLegal menerima calon pelanggan dari berbagai kanal, mengarahkannya ke konsultasi WhatsApp, lalu melacak progresnya sampai hasil akhir untuk mengukur kualitas dan konversi setiap sumber pemasaran.

## Language

**Visitor**:
Orang anonim yang mengakses website EasyLegal dan belum mengklik CTA WhatsApp.
_Avoid_: Lead

**Lead**:
Satu peluang konsultasi yang dibuat ketika Visitor mengklik CTA WhatsApp; satu Lead memiliki satu Lead Code dan satu attribution awal.
_Avoid_: Click, visitor, customer

**Lead Code**:
Kode publik unik yang disisipkan ke pesan WhatsApp agar percakapan dapat dicocokkan dengan Lead di dashboard.
_Avoid_: Database ID, referral code

**Referral Code**:
Kode milik partner, campaign, affiliate, atau tautan khusus yang menjelaskan siapa atau aktivitas mana yang merujuk Visitor.
_Avoid_: Lead Code, source

**Attribution**:
Rekaman asal akuisisi Lead, termasuk channel, campaign, referral code, landing page, dan parameter iklan.
_Avoid_: Referral Code

**Lead Source Code**:
Kode sumber ringkas yang disimpan pada Lead dan dibawa ke pesan WhatsApp; kode canonical utama adalah `gads`, `metaads`, dan `googleseo`.
_Avoid_: Lead Code, Referral Code

**Entry Point**:
URL pertama EasyLegal yang dikunjungi dalam attribution window suatu Visitor.
_Avoid_: CTA location, product page

**CTA Location**:
Halaman dan elemen tempat Visitor mengklik CTA WhatsApp.
_Avoid_: Entry Point

**Interested Service**:
Layanan atau produk yang terkait dengan CTA WhatsApp yang diklik.
_Avoid_: Page path

**Lead Stage**:
Tahap operasional Lead: NEW, CONTACTED, QUALIFIED, PROPOSAL, WON, atau LOST.
_Avoid_: Temperature

**Lead Temperature**:
Ringkasan kualitas Lead untuk pelaporan: COLD, WARM, atau HOT, yang diturunkan dari Lead Stage.
_Avoid_: Status

**COLD**:
Lead yang belum mendapat respons/proses berarti atau berakhir tidak jadi.

**WARM**:
Lead yang sudah bertanya atau sedang dilayani, tetapi belum order.

**HOT**:
Lead yang sudah order atau closing.

**Conversion**:
Lead yang mencapai tahap WON.
_Avoid_: WhatsApp click, contact
