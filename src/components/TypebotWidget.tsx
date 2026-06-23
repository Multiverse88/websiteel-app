'use client'

import { useEffect } from 'react'

const TYPEBOT_HOST = 'https://typebot.easylegal.my.id'
const TYPEBOT_BOT_ID = process.env.NEXT_PUBLIC_TYPEBOT_BOT_ID || ''

export function TypebotWidget() {
  useEffect(() => {
    if (!TYPEBOT_BOT_ID) return

    const script = document.createElement('script')
    script.src = `${TYPEBOT_HOST}/typebot-embed/embed.js`
    script.type = 'module'
    script.async = true

    script.onload = () => {
      // @ts-ignore
      if (window.Typebot) {
        // @ts-ignore
        window.Typebot.initBubble({
          typebot: TYPEBOT_BOT_ID,
          apiHost: TYPEBOT_HOST,
          theme: {
            button: {
              backgroundColor: '#D62828',
              iconColor: '#FFFFFF',
              customSize: '64px',
              bottom: '24px',
              right: '24px',
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

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
