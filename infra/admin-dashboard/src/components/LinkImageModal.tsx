import type { ReactNode } from 'react'

interface LinkImageModalProps {
  open: boolean
  onClose: () => void
  icon: ReactNode
  title: string
  children: ReactNode
}

// Shared overlay shell for the WYSIWYG editors' link/image insert popups
// (ArticleEditor, NewsletterEditor). Distinct from components/Modal.tsx's
// global CSS-driven look (different overlay opacity, × close button) —
// this preserves the editors' existing Tailwind card chrome exactly.
export default function LinkImageModal({ open, onClose, icon, title, children }: LinkImageModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl shadow-sm border border-gray-200 p-5 w-full max-w-md mx-4">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h3 className="text-[16px] font-extrabold text-gray-900">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  )
}
