import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import Modal from './Modal'

// Compact color wordmark, copied from apps/web-id/public/'Logo EL.png' — used
// as the center overlay on generated QR codes. A white backdrop is drawn
// behind it so it stays legible regardless of what the QR's light color is.
// import.meta.env.BASE_URL (Vite's configured `/dashboard/` base) matters
// here: this app's own `/images/*` route is proxied to a different backend
// (see vite.config.ts), so a bare `/images/...` string would 404 — only
// `${BASE_URL}images/...` reliably hits this app's own public/ file.
const LOGO_SRC = `${import.meta.env.BASE_URL}images/logo-el.png`
const QR_SIZE = 480
// Fraction of the QR's width the logo box occupies. Error correction level
// 'H' nominally tolerates ~30% obscured area, but 0.40 (16% area) actually
// failed to decode in testing — real scanners care about more than raw
// obscured percentage (alignment/timing pattern overlap, etc). 0.36 (13%
// area) decoded correctly for both a short and a long redirect URL.
const LOGO_RATIO = 0.36

interface QrCodeModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  fileName: string
}

export default function QrCodeModal({ isOpen, onClose, url, fileName }: QrCodeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen || !url) return
    let cancelled = false
    setError(null)

    const canvas = canvasRef.current
    if (!canvas) return

    QRCode.toCanvas(canvas, url, {
      width: QR_SIZE,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: { dark: '#111827', light: '#ffffff' },
    })
      .then(() => {
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const logo = new Image()
        logo.onload = () => {
          if (cancelled) return

          const boxSize = canvas.width * LOGO_RATIO
          const boxX = (canvas.width - boxSize) / 2
          const boxY = (canvas.height - boxSize) / 2
          const radius = boxSize * 0.18

          const roundedRectPath = () => {
            ctx.beginPath()
            ctx.moveTo(boxX + radius, boxY)
            ctx.arcTo(boxX + boxSize, boxY, boxX + boxSize, boxY + boxSize, radius)
            ctx.arcTo(boxX + boxSize, boxY + boxSize, boxX, boxY + boxSize, radius)
            ctx.arcTo(boxX, boxY + boxSize, boxX, boxY, radius)
            ctx.arcTo(boxX, boxY, boxX + boxSize, boxY, radius)
            ctx.closePath()
          }

          roundedRectPath()
          ctx.fillStyle = '#ffffff'
          ctx.fill()

          // Contain-fit the logo inside the box, preserving its native
          // aspect ratio instead of stretching it to a square. The logo
          // asset itself has an opaque white background, so its own square
          // corners would poke past the rounded backing at this padding —
          // clip to the same rounded path to crop it cleanly.
          const padding = boxSize * 0.04
          const innerSize = boxSize - padding * 2
          const scale = Math.min(innerSize / logo.width, innerSize / logo.height)
          const drawWidth = logo.width * scale
          const drawHeight = logo.height * scale
          const drawX = boxX + (boxSize - drawWidth) / 2
          const drawY = boxY + (boxSize - drawHeight) / 2

          ctx.save()
          roundedRectPath()
          ctx.clip()
          ctx.drawImage(logo, drawX, drawY, drawWidth, drawHeight)
          ctx.restore()
        }
        logo.onerror = () => setError('Gagal memuat logo EasyLegal.')
        logo.src = LOGO_SRC
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Gagal membuat QR code.')
      })

    return () => {
      cancelled = true
    }
  }, [isOpen, url])

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `${fileName}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="QR Code Redirect">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {error && <p style={{ color: '#dc2626', fontSize: 13 }}>{error}</p>}
        <canvas
          ref={canvasRef}
          width={QR_SIZE}
          height={QR_SIZE}
          style={{
            width: 240,
            height: 240,
            borderRadius: 12,
            border: '1px solid var(--border)',
            display: error ? 'none' : 'block',
          }}
        />
        <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', wordBreak: 'break-all', textAlign: 'center', margin: 0 }}>
          {url}
        </p>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={onClose}>Tutup</button>
          <button className="btn btn--primary" onClick={download} disabled={!!error}>
            Download PNG
          </button>
        </div>
      </div>
    </Modal>
  )
}
