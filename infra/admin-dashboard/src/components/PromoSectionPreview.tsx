import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MessageCircle, Monitor, Smartphone } from 'lucide-react'

interface PromoVariant {
  text: string
  weight?: number
}

interface PromoPreviewItem {
  id: number | string
  title: string
  image: string
  link: string
  variants?: PromoVariant[]
}

interface PromoSectionPreviewProps {
  promos: PromoPreviewItem[]
}
function resolvePreviewImage(src: string): string {
  if (src.startsWith('/promo/')) return `https://cdn.easylegal.my.id/images${src}`
  return src.startsWith('/') ? `https://easylegal.id${src}` : src
}


function PreviewImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => setFailed(false), [src])

  if (!src || failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100 text-gray-400">
        <span className="material-symbols-outlined text-4xl">image_not_supported</span>
        <span className="text-xs font-bold">Gambar belum tersedia</span>
      </div>
    )
  }

  return <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" onError={() => setFailed(true)} />
}

export default function PromoSectionPreview({ promos }: PromoSectionPreviewProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({})
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollTo = (index: number) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children.item(index) as HTMLElement | null
    if (!card) return
    container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: 'smooth' })
    setActiveIndex(index)
  }

  const moveVariant = (promo: PromoPreviewItem, direction: number) => {
    const variants = (promo.variants || []).filter((variant) => variant.text.trim())
    if (!variants.length) return
    const current = selectedVariants[String(promo.id)] ?? 0
    const next = (current + direction + variants.length) % variants.length
    setSelectedVariants((selected) => ({ ...selected, [String(promo.id)]: next }))
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold text-gray-900">Preview Tampilan Website</h2>
          <p className="mt-0.5 text-xs text-gray-500">Perubahan tampil langsung tanpa perlu disimpan.</p>
        </div>
        <div className="flex w-fit rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${viewport === 'desktop' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            <Monitor className="h-4 w-4" /> Desktop
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${viewport === 'mobile' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            <Smartphone className="h-4 w-4" /> Mobile
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-3 sm:p-6">
        <div className={`mx-auto overflow-hidden bg-white transition-[max-width] duration-300 ${viewport === 'mobile' ? 'max-w-[390px]' : 'max-w-[1240px]'}`}>
          <div className={viewport === 'mobile' ? 'px-4 py-8' : 'px-8 py-10'}>
            <div className={`mb-8 flex gap-5 ${viewport === 'mobile' ? 'flex-col' : 'items-end justify-between'}`}>
              <div className="max-w-2xl">
                <span className="mb-2 block text-[13px] font-extrabold uppercase tracking-[0.2em] text-[#D62828]">Promo Spesial</span>
                <h3 className={`font-black leading-[1.15] tracking-tight text-gray-900 ${viewport === 'mobile' ? 'text-[26px]' : 'text-[34px]'}`}>Penawaran terbaru dari EasyLegal</h3>
                <p className={`mt-3 font-medium leading-relaxed text-gray-500 ${viewport === 'mobile' ? 'text-[15px]' : 'text-[17px]'}`}>
                  Nikmati berbagai promo pilihan untuk membantu proses legalitas dan manajemen bisnis Anda menjadi lebih efisien.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => scrollTo(Math.max(0, activeIndex - 1))} className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>
                <button type="button" onClick={() => scrollTo(Math.min(promos.length - 1, activeIndex + 1))} className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600">
                  <ArrowRight className="h-4 w-4" />
                </button>
                <span className="rounded-full bg-[#D62828] px-4 py-2.5 text-xs font-extrabold text-white">Lihat Semua Promo</span>
              </div>
            </div>

            {promos.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center text-sm font-medium text-gray-400">Belum ada promo untuk dipreview.</div>
            ) : (
              <>
                <div
                  ref={scrollRef}
                  onScroll={(event) => {
                    const container = event.currentTarget
                    const firstCard = container.firstElementChild as HTMLElement | null
                    if (!firstCard) return
                    setActiveIndex(Math.min(promos.length - 1, Math.max(0, Math.round(container.scrollLeft / (firstCard.offsetWidth + 24)))))
                  }}
                  className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {promos.map((promo) => {
                    const variants = (promo.variants || []).filter((variant) => variant.text.trim())
                    const variantIndex = Math.min(selectedVariants[String(promo.id)] ?? 0, Math.max(0, variants.length - 1))
                    const promoText = variants[variantIndex]?.text || promo.title || 'Judul promo akan tampil di sini'
                    const weights = variants.map((variant) => typeof variant.weight === 'number' && variant.weight > 0 ? variant.weight : 1)
                    const totalWeight = weights.reduce((total, weight) => total + weight, 0)
                    const percentage = totalWeight ? Math.round((weights[variantIndex] / totalWeight) * 100) : 100

                    return (
                      <article
                        key={promo.id}
                        className={`flex shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] ${viewport === 'mobile' ? 'w-full' : 'w-[calc(33.333%-1rem)] min-w-[260px]'}`}
                      >
                        <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-2xl bg-gray-50">
                          <PreviewImage src={resolvePreviewImage(promo.image)} alt={promoText} />
                        </div>
                        <div className="flex flex-1 flex-col px-2 pb-2">
                          <h4 className="mb-3 text-[18px] font-black leading-snug text-gray-900">{promoText}</h4>
                          {variants.length > 0 && (
                            <div className="mb-4 flex items-center justify-between rounded-lg bg-red-50 px-2 py-1.5 text-[11px] font-bold text-[#B91C1C]">
                              <button type="button" onClick={() => moveVariant(promo, -1)} aria-label="Varian sebelumnya" className="p-0.5">‹</button>
                              <span>Varian {variantIndex + 1}/{variants.length} · {percentage}% rotasi</span>
                              <button type="button" onClick={() => moveVariant(promo, 1)} aria-label="Varian berikutnya" className="p-0.5">›</button>
                            </div>
                          )}
                          <div className="mt-auto flex gap-3">
                            <button type="button" title={promo.link || 'Link belum diisi'} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#D62828] py-3 text-[14px] font-extrabold text-white">
                              Selengkapnya <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                            </button>
                            <button type="button" title={`WhatsApp: ${promoText}`} className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#D62828] text-white shadow-sm">
                              <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>

                <div className="mt-4 flex justify-center gap-2">
                  {promos.map((promo, index) => (
                    <button
                      key={promo.id}
                      type="button"
                      onClick={() => scrollTo(index)}
                      aria-label={`Lihat promo ${index + 1}`}
                      className={`h-2 rounded-full transition-all ${activeIndex === index ? 'w-7 bg-[#D62828]' : 'w-2 bg-gray-200'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
