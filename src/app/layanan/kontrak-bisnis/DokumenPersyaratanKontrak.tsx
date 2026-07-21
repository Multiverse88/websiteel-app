import { Check } from "lucide-react";

export default function DokumenPersyaratanKontrak() {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-gray-200/50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3">
          <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">DOKUMEN PERSYARATAN</p>
          <h2 className="font-heading text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
            Yang perlu disiapkan
          </h2>
          <p className="text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Setiap jenis kontrak membutuhkan dokumen berbeda. Tim kami akan memandu pengumpulan dan verifikasi dokumen yang dibutuhkan.
          </p>
        </div>

        {/* Grid Layout of 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-[1000px] mx-auto items-stretch">
          {/* Left Card: Informasi Para Pihak */}
          <div className="bg-[#F9FAFB] rounded-[24px] p-6 sm:p-8 text-left h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-[16px] sm:text-[16px] font-black text-gray-950 mb-2 leading-tight">Informasi Para Pihak</h4>
            <p className="text-[16px] sm:text-[16px] text-gray-500 font-medium mb-6 leading-relaxed">Data identitas pihak yang terlibat dalam perjanjian</p>
            
            <ul className="space-y-4">
              <li className="flex items-start text-[16px] sm:text-[16px] font-medium text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-[#990202] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={4} />
                </div>
                <span><strong className="font-bold text-gray-700">KTP / Paspor</strong> semua pihak yang terlibat</span>
              </li>
              <li className="flex items-start text-[16px] sm:text-[16px] font-medium text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-[#990202] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={4} />
                </div>
                <span><strong className="font-bold text-gray-700">NPWP</strong> (untuk perjanjian bisnis/korporasi)</span>
              </li>
              <li className="flex items-start text-[16px] sm:text-[16px] font-medium text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-[#990202] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={4} />
                </div>
                <span><strong className="font-bold text-gray-700">Akta Pendirian & NIB</strong> (jika atas nama badan usaha)</span>
              </li>
              <li className="flex items-start text-[16px] sm:text-[16px] font-medium text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-[#990202] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={4} />
                </div>
                <span><strong className="font-bold text-gray-700">Surat Kuasa</strong> (jika diwakili oleh kuasa hukum)</span>
              </li>
            </ul>
          </div>

          {/* Right Card: Detail Substansi Perjanjian */}
          <div className="bg-[#F9FAFB] rounded-[24px] p-6 sm:p-8 text-left h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-[16px] sm:text-[16px] font-black text-gray-950 mb-2 leading-tight">Detail Substansi Perjanjian</h4>
            <p className="text-[16px] sm:text-[16px] text-gray-500 font-medium mb-6 leading-relaxed">Informasi inti untuk penyusunan klausul kontrak</p>
            
            <ul className="space-y-4">
              <li className="flex items-start text-[16px] sm:text-[16px] font-medium text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-[#990202] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={4} />
                </div>
                <span><strong className="font-bold text-gray-700">Deskripsi objek perjanjian</strong> (jasa, barang, kerjasama, dll)</span>
              </li>
              <li className="flex items-start text-[16px] sm:text-[16px] font-medium text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-[#990202] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={4} />
                </div>
                <span><strong className="font-bold text-gray-700">Nilai transaksi & skema pembayaran</strong></span>
              </li>
              <li className="flex items-start text-[16px] sm:text-[16px] font-medium text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-[#990202] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={4} />
                </div>
                <span><strong className="font-bold text-gray-700">Jangka waktu perjanjian</strong> yang diinginkan</span>
              </li>
              <li className="flex items-start text-[16px] sm:text-[16px] font-medium text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-[#990202] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={4} />
                </div>
                <span><strong className="font-bold text-gray-700">Ketentuan khusus</strong> (NDA, non-compete, force majeure, dll)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
