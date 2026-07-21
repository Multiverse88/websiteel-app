import React from "react";
import { Check } from "lucide-react";

export default function PengertianPKKPR() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[16px] font-black text-[#990202] uppercase tracking-[0.2em] mb-3">
            PENGERTIAN
          </p>
          <h2 className="text-[28px] sm:text-[40px] font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
            Apa itu PKKPR?
          </h2>
          <p className="text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed">
            PKKPR adalah dokumen konfirmasi dari pemerintah bahwa lokasi usaha Anda sesuai peruntukan dalam tata ruang wilayah. Menggantikan sistem Izin Lokasi lama, kini terintegrasi penuh dalam sistem OSS.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Dasar Hukum */}
          <div className="bg-[#FEF2F2] rounded-[24px] p-6 sm:p-10 flex flex-col h-full">
            <h3 className="text-[16px] font-black text-[#990202] uppercase tracking-[0.1em] mb-6">
              DASAR HUKUM PENGURUSAN PKKPR
            </h3>
            
            <div className="space-y-4 flex-grow">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h4 className="text-[16px] font-bold text-gray-900 mb-2">PP No. 28 Tahun 2025</h4>
                <p className="text-[16px] text-gray-500 leading-relaxed font-medium">
                  Tentang Penyelenggaraan Perizinan Berusaha Berbasis Risiko. Regulasi terbaru yang mengatur kesesuaian kegiatan pemanfaatan ruang sebagai syarat wajib dalam ekosistem perizinan berusaha berbasis risiko di Indonesia.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h4 className="text-[16px] font-bold text-gray-900 mb-2">Permen ATR/BPN No. 13 Tahun 2021</h4>
                <p className="text-[16px] text-gray-500 leading-relaxed font-medium">
                  Mengatur tata cara pengajuan, pemrosesan, dan penerbitan PKKPR oleh instansi berwenang, termasuk seluruh persyaratan teknis dan administratif yang wajib dipenuhi pemohon.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h4 className="text-[16px] font-bold text-gray-900 mb-2">PP No. 21 Tahun 2021</h4>
                <p className="text-[16px] text-gray-500 leading-relaxed font-medium">
                  Tentang Penyelenggaraan Penataan Ruang. Regulasi teknis pelaksanaan PKKPR yang mengatur mekanisme konfirmasi, persetujuan, dan rekomendasi kesesuaian tata ruang secara menyeluruh.
                </p>
              </div>
            </div>

            {/* Bottom Dark Card */}
            <div className="mt-6 bg-[#111827] rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#990202] flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <p className="text-[16px] text-white font-semibold leading-snug">
                PKKPR diatur oleh sejumlah regulasi yang menjadi landasan operasional perizinan tata ruang di Indonesia.
              </p>
            </div>
          </div>

          {/* Right Column: Q&A Cards */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-[16px] font-black text-[#990202] uppercase tracking-[0.1em] mb-3">PENGERTIAN PKKPR</h4>
              <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                PKKPR adalah dokumen konfirmasi dari pemerintah bahwa lokasi usaha Anda sesuai peruntukan dalam tata ruang wilayah. Menggantikan sistem Izin Lokasi lama, kini terintegrasi penuh dalam sistem OSS.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-[16px] font-black text-[#990202] uppercase tracking-[0.1em] mb-3">KAPAN PKKPR DIPERLUKAN?</h4>
              <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                PKKPR wajib dimiliki sebelum memulai konstruksi, operasional, atau pengembangan usaha di lokasi manapun. Diterbitkan jika RDTR digital belum tersedia, atau lokasi memerlukan kajian tata ruang lebih lanjut oleh pemerintah daerah.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-[16px] font-black text-[#990202] uppercase tracking-[0.1em] mb-3">PERBEDAAN KKKPR VS PKKPR</h4>
              <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                KKKPR diterbitkan otomatis oleh sistem OSS apabila lokasi sudah tercantum dalam RDTR digital yang terintegrasi (lebih cepat). PKKPR diterbitkan jika RDTR digital belum tersedia dan memerlukan rapat koordinasi instansi (proses lebih panjang).
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-[16px] font-black text-[#990202] uppercase tracking-[0.1em] mb-3">CAKUPAN LAYANAN EASYLEGAL</h4>
              <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                EasyLegal membantu seluruh proses pengurusan PKKPR dari konsultasi awal, pengumpulan dokumen, penerbitan NIB, submission melalui OSS-RBA, hingga dokumen terbit dan serah terima. Proses bisa dilakukan 100% online.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
