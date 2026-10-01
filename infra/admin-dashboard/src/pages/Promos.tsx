import { useState, useEffect } from 'react'
import { api } from '../lib/api'

interface PromoVariant {
  text: string;
  weight?: number;
}

interface Promo {
  id: number | string;
  title: string;
  image: string;
  link: string;
  whatsappLink: string;
  variants?: PromoVariant[];
}

// Mirrors the FALLBACK_PROMOS baked into apps/web-id & apps/web's
// BottomPromoSection.tsx — shown here the first time this page loads (the
// PROMOS setting hasn't been saved yet) so the admin sees what's actually
// live today instead of an empty list, ready to edit/upload real images
// and hit Save (which writes PROMOS and takes over from the hardcoded
// component fallback from then on).
const DEFAULT_PROMOS: Promo[] = [
  { id: 1, title: 'Super Hot Deal - Promo Terbatas', image: '/promo/super-hot-deal.jpg', link: '/layanan/pendirian-badan-usaha', whatsappLink: '' },
  { id: 2, title: 'Hot Deal - Jangan Sampai Terlewat', image: '/promo/hot-deal.jpg', link: '/layanan/pendirian-badan-usaha', whatsappLink: '' },
  { id: 3, title: 'Menangkan iPhone & Hadiah Rp12.000.000', image: '/promo/iphone.jpg', link: '/layanan/pendirian-badan-usaha', whatsappLink: '' },
  { id: 4, title: 'Promo Semarak Kemerdekaan', image: '/promo/promo-kemerdekaan.jpg', link: '/layanan/pendirian-badan-usaha', whatsappLink: '' },
  { id: 5, title: 'Melayani Seluruh Indonesia', image: '/promo/melayani-seluruh-indonesia.jpg', link: '/layanan/pendirian-badan-usaha', whatsappLink: '' },
]

export default function Promos() {
  const [promos, setPromos] = useState<Promo[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [uploadingImageId, setUploadingImageId] = useState<number | string | null>(null)

  useEffect(() => {
    fetchPromos()
  }, [])

  const fetchPromos = async () => {
    try {
      setLoading(true)
      const json = await api.getApiSetting('PROMOS')
      if (json?.data && Array.isArray(json.data)) {
        setPromos(json.data)
      } else {
        setPromos(DEFAULT_PROMOS)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (promoId: number | string, file: File) => {
    setUploadingImageId(promoId)
    try {
      const res = await api.uploadMedia(file)
      if (res?.data?.url) {
        updatePromo(promoId, 'image', res.data.url)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error'
      alert('Gagal mengunggah gambar: ' + message)
    } finally {
      setUploadingImageId(null)
    }
  }

  const handleSave = async (updatedPromos: Promo[] = promos) => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')
      
      await api.saveApiSetting('PROMOS', updatedPromos)

      setSuccess('Promo berhasil disimpan!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const addPromo = () => {
    const newPromo: Promo = {
      id: Date.now(),
      title: 'Judul Promo Baru',
      image: '/promo/placeholder.jpg',
      link: '/layanan/pendirian-badan-usaha',
      whatsappLink: 'https://wa.me/6281234567890'
    }
    setPromos([...promos, newPromo])
  }

  const removePromo = (id: number | string) => {
    if (confirm('Yakin ingin menghapus promo ini?')) {
      setPromos(promos.filter(p => p.id !== id))
    }
  }

  const updatePromo = (id: number | string, field: keyof Promo, value: string) => {
    setPromos(promos.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const addVariant = (promoId: number | string) => {
    setPromos(promos.map(p => p.id === promoId ? { ...p, variants: [...(p.variants || []), { text: '', weight: 1 }] } : p))
  }

  const removeVariant = (promoId: number | string, variantIndex: number) => {
    setPromos(promos.map(p => p.id === promoId ? { ...p, variants: (p.variants || []).filter((_, i) => i !== variantIndex) } : p))
  }

  const updateVariant = (promoId: number | string, variantIndex: number, field: keyof PromoVariant, value: string) => {
    setPromos(promos.map(p => {
      if (p.id !== promoId) return p
      const variants = [...(p.variants || [])]
      const current = variants[variantIndex] || { text: '' }
      variants[variantIndex] = field === 'weight'
        ? { ...current, weight: Number(value) || 1 }
        : { ...current, text: value }
      return { ...p, variants }
    }))
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const newPromos = [...promos]
    const temp = newPromos[index - 1]
    newPromos[index - 1] = newPromos[index]
    newPromos[index] = temp
    setPromos(newPromos)
  }

  const moveDown = (index: number) => {
    if (index === promos.length - 1) return
    const newPromos = [...promos]
    const temp = newPromos[index + 1]
    newPromos[index + 1] = newPromos[index]
    newPromos[index] = temp
    setPromos(newPromos)
  }

  if (loading) {
    return <div className="p-8">Memuat data promo...</div>
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Promo</h1>
          <p className="text-gray-500 mt-1">Tambah, hapus, atau atur urutan banner promo yang tampil di halaman beranda.</p>
        </div>
        <button
          onClick={addPromo}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Tambah Promo
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
      {success && <div className="p-4 bg-green-50 text-green-600 rounded-lg text-sm">{success}</div>}
      
      <div className="space-y-4">
        {promos.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
            Belum ada promo. Klik "Tambah Promo" untuk memulai.
          </div>
        ) : (
          promos.map((promo, index) => (
            <div key={promo.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex gap-6">
              
              {/* Controls */}
              <div className="flex flex-col gap-2 items-center justify-center border-r border-gray-100 pr-4">
                <button onClick={() => moveUp(index)} disabled={index === 0} className="text-gray-400 hover:text-primary disabled:opacity-30">
                  <span className="material-symbols-outlined">expand_less</span>
                </button>
                <span className="text-sm font-bold text-gray-400">{index + 1}</span>
                <button onClick={() => moveDown(index)} disabled={index === promos.length - 1} className="text-gray-400 hover:text-primary disabled:opacity-30">
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
              </div>

              {/* Fields */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Judul Promo</label>
                  <input 
                    type="text" 
                    value={promo.title}
                    onChange={(e) => updatePromo(promo.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary outline-none"
                    placeholder="Contoh: Super Hot Deal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Gambar</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={promo.image}
                      onChange={(e) => updatePromo(promo.id, 'image', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary outline-none"
                      placeholder="/promo/gambar.jpg"
                    />
                    <label className="shrink-0 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center gap-1 whitespace-nowrap">
                      <span className={`material-symbols-outlined text-[16px] ${uploadingImageId === promo.id ? 'animate-spin' : ''}`}>
                        {uploadingImageId === promo.id ? 'progress_activity' : 'upload'}
                      </span>
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingImageId === promo.id}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(promo.id, file)
                          e.target.value = ''
                        }}
                      />
                    </label>
                  </div>
                  {promo.image && (
                    <img
                      src={promo.image}
                      alt=""
                      className="mt-2 h-16 w-16 object-cover rounded-md border border-gray-200"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                      onLoad={(e) => { e.currentTarget.style.display = 'block' }}
                    />
                  )}
                  <p className="text-[11px] text-gray-400 mt-1">Upload otomatis dikompres &amp; disimpan ke CDN, atau isi URL manual</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Link Selengkapnya (URL tujuan)</label>
                  <input 
                    type="text" 
                    value={promo.link}
                    onChange={(e) => updatePromo(promo.id, 'link', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary outline-none"
                    placeholder="/layanan/pendirian-pt"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Link WhatsApp</label>
                  <input 
                    type="text" 
                    value={promo.whatsappLink}
                    onChange={(e) => updatePromo(promo.id, 'whatsappLink', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary outline-none"
                    placeholder="https://wa.me/628..."
                  />
                </div>
                <div className="col-span-1 md:col-span-2 border-t border-gray-100 pt-4 mt-1">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-gray-600 uppercase">
                      Varian Copywriting (opsional — rotasi per pengunjung)
                    </label>
                    <button
                      onClick={() => addVariant(promo.id)}
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      Tambah Varian
                    </button>
                  </div>
                  {(!promo.variants || promo.variants.length === 0) ? (
                    <p className="text-[11px] text-gray-400">
                      Tanpa varian, "Judul Promo" di atas selalu dipakai. Tambah 2+ varian untuk rotasi copy antar pengunjung — tiap varian otomatis terhitung terpisah di Leads WhatsApp &rarr; Per Layanan.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {promo.variants.map((variant, vIdx) => (
                        <div key={vIdx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={variant.text}
                            onChange={(e) => updateVariant(promo.id, vIdx, 'text', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary outline-none"
                            placeholder={`Varian ${vIdx + 1}`}
                          />
                          <input
                            type="number"
                            min={1}
                            value={variant.weight ?? 1}
                            onChange={(e) => updateVariant(promo.id, vIdx, 'weight', e.target.value)}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary outline-none"
                            title="Bobot rotasi (default 1)"
                          />
                          <button
                            onClick={() => removeVariant(promo.id, vIdx)}
                            className="text-red-400 hover:text-red-600 p-1"
                            title="Hapus varian"
                          >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="border-l border-gray-100 pl-4 flex flex-col justify-center items-center">
                <button 
                  onClick={() => removePromo(promo.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center"
                  title="Hapus Promo"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={() => handleSave()}
          disabled={saving}
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">save</span>
          {saving ? 'Menyimpan...' : 'Simpan Semua Promo'}
        </button>
      </div>
    </div>
  )
}
