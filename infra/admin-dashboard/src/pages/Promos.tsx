import { useState, useEffect } from 'react'

interface Promo {
  id: number | string;
  title: string;
  image: string;
  link: string;
  whatsappLink: string;
}

export default function Promos() {
  const [promos, setPromos] = useState<Promo[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchPromos()
  }, [])

  const fetchPromos = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:4000'}/api/v1/settings/PROMOS`)
      if (res.ok) {
        const json = await res.json()
        if (json.data && Array.isArray(json.data)) {
          setPromos(json.data)
        }
      } else {
        setPromos([])
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (updatedPromos: Promo[] = promos) => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')
      
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:4000'}/api/v1/settings/PROMOS`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // assuming auth token
        },
        body: JSON.stringify({ value: updatedPromos })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to save')
      }

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
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">URL Gambar</label>
                  <input 
                    type="text" 
                    value={promo.image}
                    onChange={(e) => updatePromo(promo.id, 'image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary outline-none"
                    placeholder="/promo/gambar.jpg"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Upload gambar via CMS / gunakan URL</p>
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
