'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const TYPEBOT_HOST = 'https://typebot.easylegal.my.id'
const TYPEBOT_BOT_ID = process.env.NEXT_PUBLIC_TYPEBOT_BOT_ID || ''

interface TypebotWindow {
  Typebot?: {
    initBubble: (config: Record<string, unknown>) => void;
    hide: () => void;
    show: () => void;
  };
}

export function TypebotWidget() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/login');

  useEffect(() => {
    if (!TYPEBOT_BOT_ID) return

    const timer = setTimeout(() => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/@typebot.io/js@latest/dist/web.js'
      script.type = 'module'
      script.async = true

      script.onload = () => {
        const typebot = (window as unknown as TypebotWindow).Typebot;
        if (typebot) {
          typebot.initBubble({
            typebot: TYPEBOT_BOT_ID,
            apiHost: TYPEBOT_HOST,
            theme: {
              button: {
                backgroundColor: '#D62828',
                iconColor: '#FFFFFF',
                size: '72px',
                bottom: 24,
                right: 24,
              },
              chatWindow: {
                backgroundColor: '#FFFFFF',
                bubbles: {
                  user: { backgroundColor: '#D62828', color: '#FFFFFF' },
                  bot: { backgroundColor: '#F5F5F5', color: '#1A1A1A' },
                },
              },
            },
          })
        }
      }

      document.head.appendChild(script)
    }, 4000);

    return () => {
      clearTimeout(timer);
      const script = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/@typebot.io/js@latest/dist/web.js"]');
      if (script) document.head.removeChild(script);
    }
  }, [])

  useEffect(() => {
    const typebot = (window as unknown as TypebotWindow).Typebot;
    if (typebot && typebot.hide && typebot.show) {
      if (isDashboard) {
        typebot.hide();
      } else {
        typebot.show();
      }
    }
  }, [isDashboard]);

  if (isDashboard) {
    return (
      <style>{`
        typebot-standard, typebot-bubble, #typebot-bubble {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `}</style>
    );
  }

  return null
}
