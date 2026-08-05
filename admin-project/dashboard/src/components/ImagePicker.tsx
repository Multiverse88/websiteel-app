import React, { useState, useEffect } from 'react';
import { X, Upload, Search, Image as ImageIcon, Loader2, Check, CloudCheck, AlertCircle, Sparkles } from 'lucide-react';
import { api } from '../lib/api';

interface ImagePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

interface MediaAsset {
  id: string;
  url: string;        // local path for <img src> preview (e.g. /images/...)
  cdnUrl: string;     // full CDN URL stored in page data
  name: string;
  category: 'promo' | 'hero' | 'layanan' | 'badges' | 'general';
  savings?: string;
}

const CDN_BASE = 'https://cdn.easylegal.my.id/images';
const LOCAL_BASE = '/images';

const PRESET_ASSETS: MediaAsset[] = [
  // Promo & Marketplace
  { id: 'promo-iphone', url: `${LOCAL_BASE}/iphone-mockup.png`, cdnUrl: `${CDN_BASE}/iphone-mockup.png`, name: 'Hadiah iPhone & Promo Legal Festival', category: 'promo' },
  { id: 'promo-shopee-3d', url: `${LOCAL_BASE}/transaksi-shopee.png`, cdnUrl: `${CDN_BASE}/transaksi-shopee.png`, name: 'Ilustrasi 3D Transaksi Shopee', category: 'promo' },
  { id: 'logo-shopee', url: `${LOCAL_BASE}/shopee.svg`, cdnUrl: `${CDN_BASE}/shopee.svg`, name: 'Logo Shopee Resmi', category: 'promo' },
  { id: 'peta-indonesia', url: `${LOCAL_BASE}/peta-indonesia.png`, cdnUrl: `${CDN_BASE}/peta-indonesia.png`, name: 'Peta Jangkauan Seluruh Indonesia', category: 'promo' },
  { id: 'promo-rups', url: `${LOCAL_BASE}/promo-rups.png`, cdnUrl: `${CDN_BASE}/promo-rups.png`, name: 'Promo Layanan RUPS', category: 'promo' },
  { id: 'promo-bule-2', url: `${LOCAL_BASE}/home/promo-bule2.png`, cdnUrl: `${CDN_BASE}/home/promo-bule2.png`, name: 'Promo Konsultan Legal 1', category: 'promo' },
  { id: 'promo-bule-3', url: `${LOCAL_BASE}/home/promo-bule3.png`, cdnUrl: `${CDN_BASE}/home/promo-bule3.png`, name: 'Promo Konsultan Legal 2', category: 'promo' },

  // Hero Section
  { id: 'hero-badan-usaha', url: `${LOCAL_BASE}/hero/hero-badan-usaha-v2.jpg`, cdnUrl: `${CDN_BASE}/hero/hero-badan-usaha-v2.jpg`, name: 'Hero Pendirian PT / CV / PMA', category: 'hero' },
  { id: 'hero-merek', url: `${LOCAL_BASE}/hero/hero-merek-v2.jpg`, cdnUrl: `${CDN_BASE}/hero/hero-merek-v2.jpg`, name: 'Hero Pendaftaran Merek & HAKI', category: 'hero' },
  { id: 'hero-nib', url: `${LOCAL_BASE}/hero/hero-nib-v2.jpg`, cdnUrl: `${CDN_BASE}/hero/hero-nib-v2.jpg`, name: 'Hero Perizinan NIB OSS RBA', category: 'hero' },
  { id: 'hero-iso', url: `${LOCAL_BASE}/hero/hero-iso-v2.jpg`, cdnUrl: `${CDN_BASE}/hero/hero-iso-v2.jpg`, name: 'Hero Sertifikasi ISO', category: 'hero' },
  { id: 'tentang-kami-hero', url: `${LOCAL_BASE}/home/tentang-kami-hero.png`, cdnUrl: `${CDN_BASE}/home/tentang-kami-hero.png`, name: 'Hero Tentang Kami / Tim EasyLegal', category: 'hero' },

  // Badges
  { id: 'badge-pse', url: `${LOCAL_BASE}/badges/pse-terdaftar.png`, cdnUrl: `${CDN_BASE}/badges/pse-terdaftar.png`, name: 'Badge Terdaftar PSE Kominfo', category: 'badges' },
  { id: 'badge-iso', url: `${LOCAL_BASE}/badges/iso-sertifikat.png`, cdnUrl: `${CDN_BASE}/badges/iso-sertifikat.png`, name: 'Badge ISO 9001 Certified', category: 'badges' },
  { id: 'badge-promo-50', url: `${LOCAL_BASE}/badges/promo-50.png`, cdnUrl: `${CDN_BASE}/badges/promo-50.png`, name: 'Badge Diskon Spesial 50%', category: 'badges' },
  { id: 'badge-promo-20', url: `${LOCAL_BASE}/badges/promo-20.png`, cdnUrl: `${CDN_BASE}/badges/promo-20.png`, name: 'Badge Diskon Spesial 20%', category: 'badges' },

  // Layanan
  { id: 'layanan-pt', url: `${LOCAL_BASE}/layanan/pt-1.jpg`, cdnUrl: `${CDN_BASE}/layanan/pt-1.jpg`, name: 'Layanan Pendirian PT', category: 'layanan' },
  { id: 'layanan-pt-perorangan', url: `${LOCAL_BASE}/layanan/pt-perorangan-1.jpg`, cdnUrl: `${CDN_BASE}/layanan/pt-perorangan-1.jpg`, name: 'Layanan PT Perorangan (UMKM)', category: 'layanan' },
  { id: 'layanan-cv', url: `${LOCAL_BASE}/layanan/cv-1.jpg`, cdnUrl: `${CDN_BASE}/layanan/cv-1.jpg`, name: 'Layanan Pendirian CV', category: 'layanan' },
  { id: 'layanan-pt-pma', url: `${LOCAL_BASE}/layanan/pt-pma-1.jpg`, cdnUrl: `${CDN_BASE}/layanan/pt-pma-1.jpg`, name: 'Layanan PT PMA (Asing)', category: 'layanan' },
  { id: 'layanan-merek', url: `${LOCAL_BASE}/layanan/merek-1.jpg`, cdnUrl: `${CDN_BASE}/layanan/merek-1.jpg`, name: 'Layanan Pendaftaran Hak Merek', category: 'layanan' },
  { id: 'layanan-nib', url: `${LOCAL_BASE}/layanan/nib-1.jpg`, cdnUrl: `${CDN_BASE}/layanan/nib-1.jpg`, name: 'Layanan Pengurusan NIB OSS', category: 'layanan' },
  { id: 'layanan-kontrak', url: `${LOCAL_BASE}/layanan/kontrak-bisnis-1.jpg`, cdnUrl: `${CDN_BASE}/layanan/kontrak-bisnis-1.jpg`, name: 'Layanan Perjanjian & Kontrak Bisnis', category: 'layanan' },
  { id: 'layanan-pkp', url: `${LOCAL_BASE}/layanan/pkp-1.jpg`, cdnUrl: `${CDN_BASE}/layanan/pkp-1.jpg`, name: 'Layanan Pengukuhan PKP Pajak', category: 'layanan' },
  { id: 'layanan-visa', url: `${LOCAL_BASE}/layanan/visa-kitas-1.jpg`, cdnUrl: `${CDN_BASE}/layanan/visa-kitas-1.jpg`, name: 'Layanan Visa & KITAS Investor', category: 'layanan' },
  { id: 'layanan-yayasan', url: `${LOCAL_BASE}/layanan/yayasan-1.jpg`, cdnUrl: `${CDN_BASE}/layanan/yayasan-1.jpg`, name: 'Layanan Pendirian Yayasan', category: 'layanan' },

  // General & Logos
  { id: 'logo-brand', url: `${LOCAL_BASE}/logo.svg`, cdnUrl: `${CDN_BASE}/logo.svg`, name: 'Logo EasyLegal Brand (Merah)', category: 'general' },
  { id: 'logo-brand-white', url: `${LOCAL_BASE}/logo-putih.png`, cdnUrl: `${CDN_BASE}/logo-putih.png`, name: 'Logo EasyLegal Putih (Dark mode)', category: 'general' },
  { id: 'rups-meeting', url: `${LOCAL_BASE}/rups-meeting.jpg`, cdnUrl: `${CDN_BASE}/rups-meeting.jpg`, name: 'Foto Suasana RUPS Notaris', category: 'general' },
  { id: 'tentang-kami-cerita', url: `${LOCAL_BASE}/home/tentang-kami-cerita.jpg`, cdnUrl: `${CDN_BASE}/home/tentang-kami-cerita.jpg`, name: 'Foto Kantor & Tim Legalitas', category: 'general' },
];

export default function ImagePicker({ isOpen, onClose, onSelect }: ImagePickerProps) {
  const [assets, setAssets] = useState<MediaAsset[]>(PRESET_ASSETS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setUploadError(null);
    setUploadSuccessMessage(null);

    api.getMedia()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const liveMap = new Map<string, MediaAsset>();

          res.data.forEach((item: any) => {
            // Use local path for preview img src, CDN URL as the stored value
            const localPath = item.url?.startsWith('/images/') ? item.url : `/images/${item.fullKey || item.name}`;
            const cdnFull = item.cdnUrl || `${CDN_BASE}/${item.fullKey || item.name}`;
            liveMap.set(cdnFull, {
              id: item.id || item.name,
              url: localPath,
              cdnUrl: cdnFull,
              name: item.name,
              category: item.category || 'general'
            });
          });

          // Merge with presets (presets take precedence for display)
          PRESET_ASSETS.forEach(preset => {
            if (!liveMap.has(preset.cdnUrl)) {
              liveMap.set(preset.cdnUrl, preset);
            }
          });

          setAssets(Array.from(liveMap.values()));
          setIsConnected(true);
        } else {
          setAssets(PRESET_ASSETS);
          setIsConnected(false);
        }
      })
      .catch(() => {
        setAssets(PRESET_ASSETS);
        setIsConnected(false);
      })
      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Semua Aset' },
    { id: 'promo', label: 'Promo & Marketplace' },
    { id: 'hero', label: 'Hero Header' },
    { id: 'badges', label: 'Badges & Sertifikat' },
    { id: 'layanan', label: 'Layanan Hukum' },
    { id: 'general', label: 'Logo & Umum' },
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase()) ||
                          asset.cdnUrl.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleAssetSelect = (asset: MediaAsset) => {
    onSelect(asset.cdnUrl); // always store CDN URL
    onClose();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    setUploading(true);
    setUploadError(null);
    setUploadSuccessMessage(null);

    try {
      const res = await api.uploadMedia(file);
      if (res && res.data) {
        const cdnFull = res.data.cdnUrl || res.data.url;
        const localPath = `/images/${res.data.fullKey || res.data.name}`;
        const uploadedAsset: MediaAsset = {
          id: res.data.id || Date.now().toString(),
          url: localPath,
          cdnUrl: cdnFull,
          name: res.data.name || file.name,
          category: 'general',
          savings: res.data.savings
        };
        setAssets(prev => [uploadedAsset, ...prev]);
        setUploadSuccessMessage(`Berhasil dikompres ${res.data.savings ? `(hemat ${res.data.savings})` : '→ WebP'} & diunggah ke MinIO!`);
        setTimeout(() => handleAssetSelect(uploadedAsset), 600);
      }
    } catch (err: any) {
      setUploadError(err.message || 'Gagal mengunggah gambar ke MinIO CDN');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden border border-gray-100">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-50 text-[#990202] rounded-xl">
              <ImageIcon size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-gray-900 leading-tight">EasyLegal Media Library</h2>
                {isConnected ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CloudCheck size={12} /> MinIO Live
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    CDN Preset
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">Semua URL disimpan sebagai CDN URL (<code className="text-[#990202] font-mono">https://cdn.easylegal.my.id/...</code>)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition">
            <X size={20} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/70 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari aset gambar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990202] transition"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-[#990202] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Count + Upload */}
        <div className="px-6 py-2.5 bg-gray-100/60 border-b border-gray-200/60 flex items-center justify-between text-xs text-gray-600">
          <span className="font-semibold text-gray-700">{filteredAssets.length} aset siap digunakan</span>
          <label className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#990202] text-white hover:bg-[#7A0101] rounded-lg text-xs font-semibold transition ${uploading ? 'opacity-70 pointer-events-none' : ''}`}>
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            <span>{uploading ? 'Mengompres & Mengunggah...' : 'Upload & Kompres ke MinIO'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        </div>

        {uploadSuccessMessage && (
          <div className="px-6 py-2 bg-emerald-50 text-emerald-700 text-xs flex items-center gap-2 border-b border-emerald-100">
            <Sparkles size={14} /><span>{uploadSuccessMessage}</span>
          </div>
        )}
        {uploadError && (
          <div className="px-6 py-2 bg-red-50 text-red-700 text-xs flex items-center gap-2 border-b border-red-100">
            <AlertCircle size={14} /><span>{uploadError}</span>
          </div>
        )}

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/40">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <Loader2 size={28} className="animate-spin text-[#990202] mb-2" />
              <p className="text-xs">Memuat media dari server...</p>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <ImageIcon size={48} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm font-medium">Tidak ada gambar yang cocok.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredAssets.map(asset => (
                <div
                  key={asset.id}
                  onClick={() => handleAssetSelect(asset)}
                  className="group relative bg-white border border-gray-200/80 rounded-2xl overflow-hidden cursor-pointer hover:border-[#990202] hover:shadow-md transition-all flex flex-col"
                >
                  <div className="h-36 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {asset.savings && (
                      <div className="absolute top-2 left-2">
                        <span className="px-1.5 py-0.5 bg-emerald-600 text-white rounded-md text-[9px] font-bold">
                          Hemat {asset.savings}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-1 bg-[#990202] text-white rounded-lg inline-flex items-center">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 border-t border-gray-100 bg-white flex flex-col flex-1">
                    <p className="text-[11px] font-bold text-gray-800 line-clamp-1 leading-tight mb-1" title={asset.name}>
                      {asset.name}
                    </p>
                    <span className="text-[9px] font-mono text-gray-400 truncate" title={asset.cdnUrl}>
                      cdn/{asset.cdnUrl.replace('https://cdn.easylegal.my.id/images/', '')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-white flex items-center justify-between text-xs text-gray-400">
          <span>Klik gambar untuk menggunakannya. Upload dikompres otomatis → WebP.</span>
          <button type="button" onClick={onClose} className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-xs transition">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
