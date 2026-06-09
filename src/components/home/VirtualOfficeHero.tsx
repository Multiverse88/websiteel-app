
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight, Home, MapPin, Clock, FileText, Shield, Building } from 'lucide-react';

const VirtualOfficeHero = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Home className="w-4 h-4 mr-2" />
          <span>Beranda</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span>Layanan</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-700">Virtual Office</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <span className="inline-block bg-red-100 text-red-800 text-sm font-semibold mb-4 px-3 py-1 rounded-full w-fit">
              <span className="mr-2">•</span>Virtual Office EasyLegal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Alamat bisnis prestisius, <br />
              <span className="text-red-600">tanpa sewa kantor fisik.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Dapatkan alamat komersial di Bandung, Jakarta, & Bekasi untuk legalitas PT, NPWP, hingga PKP — lengkap dengan resepsionis, meeting room, & layanan surat-menyurat. Mulai dari Rp1jt/tahun.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                Konsultasi Gratis <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Lihat Lokasi Office
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-700">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-red-500" />
                <div>
                  <p className="font-bold">3 Kota</p>
                  <p className="text-sm text-gray-500">Bandung · Jakarta · Bekasi</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-3 text-red-500" />
                <div>
                  <p className="font-bold">70 jam/tahun</p>
                  <p className="text-sm text-gray-500">Meeting room gratis</p>
                </div>
              </div>
              <div className="flex items-center">
                <FileText className="w-6 h-6 mr-3 text-red-500" />
                <div>
                  <p className="font-bold">PKP-friendly</p>
                  <p className="text-sm text-gray-500">Legalitas lengkap</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative aspect-[4/3] lg:aspect-auto h-full">
            <Image
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop"
              alt="Business meeting in a modern office"
              fill
              className="rounded-3xl object-cover"
            />
            <div className="absolute -top-8 -left-8 w-64 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-start">
                <div className="p-2 bg-red-100 rounded-lg mr-4">
                  <Building className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Alamat Komersial</p>
                  <p className="text-sm text-gray-500">Pakai untuk PT, NPWP, PKP</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-start">
                <div className="p-2 bg-yellow-100 rounded-lg mr-4">
                  <Shield className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">IMB & PBB Lengkap</p>
                  <p className="text-sm text-gray-500">Legalitas gedung terverifikasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualOfficeHero;
