"use client"

import { useState } from 'react';
import { Search, CheckCircle2, Circle, Clock, Building2, Calendar, FileText } from 'lucide-react';
import { getTrackingByCode } from './actions';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TrackingPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const res = await getTrackingByCode(code.trim());
    if (res?.success && res.data) {
      setResult(res.data);
    } else {
      setError(res?.error || "Nomor resi tidak ditemukan. Pastikan Anda mengetik dengan benar (contoh: EL-2026-1234)");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-red-50 text-[#D62828] rounded-2xl mb-4">
              <Search size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Lacak Progress Layanan</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">Masukkan nomor resi tracking yang telah diberikan oleh tim EasyLegal untuk melihat status terkini dari dokumen Anda.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 md:p-3 mb-10 transition-all focus-within:ring-4 focus-within:ring-[#D62828]/10 focus-within:border-[#D62828]">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Contoh: EL-2026-1234"
                className="flex-1 px-5 py-4 bg-transparent outline-none text-lg font-mono placeholder:text-gray-400 placeholder:font-sans"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#D62828] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#B91C1C] transition disabled:opacity-70"
              >
                {loading ? 'Mencari...' : 'Lacak Dokumen'}
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center">
              <FileText className="mx-auto mb-2 opacity-50" size={24} />
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header Card */}
              <div className="bg-slate-900 text-white p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Building2 size={120} />
                </div>
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    {result.serviceType}
                  </div>
                  <h2 className="text-3xl font-extrabold mb-2">{result.clientName}</h2>
                  <div className="flex items-center gap-4 text-slate-300 font-mono text-sm">
                    <span>Resi: {result.trackingCode}</span>
                    <span>•</span>
                    <span>Tgl Dibuat: {new Date(result.createdAt).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* Timeline Body */}
              <div className="p-8 md:p-12">
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[21px] top-4 bottom-8 w-0.5 bg-gray-100"></div>

                  <div className="space-y-8 relative">
                    {(result.timelineData as any[]).map((step: any, idx: number) => {
                      const isDone = step.status === 'done';
                      const isCurrent = step.status === 'current';
                      
                      return (
                        <div key={step.id || idx} className={`flex gap-6 relative transition-opacity duration-300 ${step.status === 'pending' ? 'opacity-50' : ''}`}>
                          <div className="relative z-10 shrink-0 mt-1">
                            {isDone ? (
                              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center border-2 border-white shadow-sm text-green-600">
                                <CheckCircle2 size={24} />
                              </div>
                            ) : isCurrent ? (
                              <div className="w-11 h-11 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white shadow-sm text-yellow-600">
                                <Clock size={24} className="animate-pulse" />
                              </div>
                            ) : (
                              <div className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center border-2 border-gray-200 text-gray-300">
                                <Circle size={16} />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 pt-2 pb-4">
                            <h3 className={`text-lg font-bold ${isCurrent ? 'text-yellow-700' : isDone ? 'text-gray-900' : 'text-gray-500'}`}>
                              {step.title}
                            </h3>
                            {step.status === 'current' && (
                              <span className="inline-block mt-2 px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">SEDANG DIPROSES</span>
                            )}
                            {step.date && (
                              <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500 font-medium">
                                <Calendar size={14} />
                                {new Date(step.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {result.isCompleted && (
                  <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200 text-center">
                    <CheckCircle2 className="mx-auto text-green-500 mb-3" size={32} />
                    <h3 className="text-xl font-bold text-green-800 mb-1">Project Selesai</h3>
                    <p className="text-green-700">Seluruh dokumen legalitas telah selesai diproses. Terima kasih telah mempercayakan EasyLegal!</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
