import Image from "next/image";
import { ShieldCheck, TriangleAlert, MessageCircleWarning, MapPin } from "lucide-react";
import CopyAccountButton from "./CopyAccountButton";
import {
  financeWhatsAppUrl,
  paymentVerificationOffices,
  type PaymentVerificationEntity,
} from "@/data/payment-verification";
import styles from "./PaymentVerificationPage.module.css";

export default function PaymentVerificationPage({
  entity,
}: {
  entity: PaymentVerificationEntity;
}) {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Image
            src="/images/logo-putih.png"
            alt="EasyLegal"
            width={120}
            height={38}
            priority
            className={styles.heroLogo}
          />
          <span className={styles.heroBadge}>
            <ShieldCheck size={14} strokeWidth={2.4} aria-hidden="true" />
            Sumber Resmi Pembayaran
          </span>
          <h1 className={styles.heroTitle}>Verifikasi Rekening Resmi EasyLegal</h1>
          <p className={styles.heroSubtitle}>
            Halaman ini menampilkan data rekening dan legalitas badan usaha resmi
            EasyLegal untuk <strong>{entity.legalName}</strong>. Pastikan pembayaran
            hanya dikirim ke nomor rekening yang tercantum di bawah ini.
          </p>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.cardHead}>
              <Image
                src="/images/payment-verification/mandiri.png"
                alt="Bank Mandiri"
                width={120}
                height={35}
                className={styles.bankLogo}
              />
              <span className={styles.cardEyebrow}>Rekening Bank Resmi</span>
            </div>

            <p className={styles.fieldLabel}>Nomor Rekening</p>
            <p className={styles.accountNumber}>{entity.accountNumber}</p>
            <CopyAccountButton accountNumber={entity.accountNumber} />

            <div className={styles.divider} />

            <p className={styles.fieldLabel}>Nama Pemilik Rekening</p>
            <p className={styles.fieldValue}>{entity.accountHolder}</p>

            <p className={styles.cardNote}>
              Pastikan nama pemilik rekening sesuai saat melakukan transfer.
              EasyLegal tidak pernah meminta pembayaran ke rekening pribadi.
            </p>
          </article>

          <article className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.ahuIcon} aria-hidden="true">
                <ShieldCheck size={20} strokeWidth={2.2} />
              </span>
              <span className={styles.cardEyebrow}>Verifikasi Legalitas AHU</span>
            </div>

            <h2 className={styles.cardTitle}>Terdaftar Resmi di Sistem AHU</h2>
            <p className={styles.cardBody}>
              Pindai kode QR untuk memverifikasi langsung legalitas badan usaha di
              Sistem Administrasi Badan Usaha (AHU) Kementerian Hukum.
            </p>

            <div className={styles.qrWrap}>
              <Image
                src={entity.qrImagePath}
                alt={`Kode QR resmi AHU untuk ${entity.legalName}, membuka ${entity.ahuUrl}`}
                width={407}
                height={407}
                className={styles.qrImage}
              />
              <p className={styles.qrFallback}>
                Kode QR tidak dapat dimuat? Gunakan tombol di bawah.
              </p>
            </div>

            <p className={styles.fieldLabel}>Nomor AHU Resmi</p>
            <p className={styles.fieldValue}>{entity.ahuNumber}</p>

            <a
              href={entity.ahuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ghostButton}
            >
              Cek di Sistem AHU Kemenkumham
            </a>

            <p className={styles.cardNote}>
              QR dan tombol di atas mengarah ke halaman resmi AHU yang sama untuk{" "}
              {entity.legalName}.
            </p>
          </article>
        </div>

        <div className={styles.alertBox} role="note">
          <TriangleAlert size={22} strokeWidth={2.2} aria-hidden="true" />
          <div>
            <p className={styles.alertTitle}>
              Penting: Hindari Penipuan Rekening Transfer
            </p>
            <p className={styles.alertBody}>
              EasyLegal tidak pernah menghubungi Anda melalui telepon atau WhatsApp
              untuk meminta transfer ke rekening pribadi karyawan. Jika ada pihak
              yang mengatasnamakan EasyLegal di luar data pada halaman ini, segera
              laporkan ke tim Finance kami.
            </p>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <MessageCircleWarning size={22} strokeWidth={2.1} aria-hidden="true" />
          <p className={styles.ctaEyebrow}>Butuh konfirmasi sebelum bayar?</p>
          <h2 className={styles.ctaTitle}>Ada Keraguan atau Butuh Validasi Invoice?</h2>
          <p className={styles.ctaBody}>
            Tim Finance kami siap membantu memverifikasi apakah nomor rekening dan
            invoice yang Anda terima benar dan terdaftar resmi untuk transaksi Anda.
          </p>
          <a
            href={financeWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waButton}
          >
            Hubungi Finance via WhatsApp
          </a>
        </div>

        <div className={styles.offices}>
          <p className={styles.officesEyebrow}>Hadir di 3 Kota Terbesar</p>
          <h2 className={styles.officesTitle}>Pusat Operasional EasyLegal</h2>
          <p className={styles.officesSubtitle}>
            Kami memiliki kantor fisik yang dapat Anda kunjungi langsung untuk
            konsultasi legalitas usaha.
          </p>

          <ul className={styles.officesGrid}>
            {paymentVerificationOffices.map((office) => (
              <li key={office.name} className={styles.officeCard}>
                <MapPin size={20} strokeWidth={2.2} aria-hidden="true" />
                <p className={styles.officeName}>{office.name}</p>
                <p className={styles.officeMeta}>{office.building}</p>
                <p className={styles.officeMeta}>{office.address}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} EasyLegal. Seluruh hak cipta dilindungi.
          Halaman ini khusus untuk verifikasi pembayaran {entity.legalName}.
        </p>
      </footer>
    </main>
  );
}
