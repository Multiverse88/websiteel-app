'use client'

import { usePathname } from 'next/navigation'

const WHATSAPP_LINK = 'https://mauorder.online/easylegalbiz-2'

export function FloatingWhatsApp() {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/login')

  if (isDashboard) return null

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed z-50 flex items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      style={{ bottom: 24, right: 24, width: 64, height: 64 }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.847.505 3.65 1.464 5.234L2 22l4.909-1.436A9.96 9.96 0 0 0 12.001 22C17.524 22 22 17.522 22 12S17.524 2 12.001 2zm0 18.164a8.13 8.13 0 0 1-4.15-1.14l-.298-.176-3.099.907.923-3.02-.194-.31A8.14 8.14 0 0 1 3.84 12c0-4.507 3.658-8.163 8.161-8.163 4.502 0 8.161 3.656 8.161 8.163 0 4.505-3.659 8.164-8.161 8.164z" />
      </svg>
    </a>
  )
}
