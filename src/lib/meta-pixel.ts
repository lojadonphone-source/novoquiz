declare global {
  interface Window {
    fbq: any
    _fbq: any
  }
}

const PIXEL_ID = '1204931778279458'
const CAPI_TOKEN =
  'EAF1Qz1UQG0cBQ4ZBc2ldViaWeZCVATOSteLyGVOFyaZBsPlmq4AmM06Ckr77YnWRMITyrKPNq5wYxVMMpN2oP1fh6wVFmrVTU81otZCJICRyeCFY4qtfZBwtTQ033lOwUx9e6kimNNeTx5kZCy22CUiymlBC4GMulNvbrpDhOpoqQC7xxuDOFOBrgBh4h92AZDZD'

export const initMetaPixel = () => {
  if (typeof window === 'undefined') return

  if (window.fbq) return

  const f = window as any
  const b = document
  const e = 'script'
  const v = 'https://connect.facebook.net/en_US/fbevents.js'

  const n: any = (f.fbq = function (...args: any[]) {
    if (n.callMethod) {
      n.callMethod(...args)
    } else {
      n.queue.push(args)
    }
  })

  if (!f._fbq) f._fbq = n
  n.push = n
  n.loaded = !0
  n.version = '2.0'
  n.queue = []

  const t = b.createElement(e) as HTMLScriptElement
  t.async = !0
  t.src = v

  const s = b.getElementsByTagName(e)[0]
  if (s && s.parentNode) {
    s.parentNode.insertBefore(t, s)
  } else {
    b.head.appendChild(t)
  }

  window.fbq('init', PIXEL_ID)
}

export const trackPageView = async (stepUrl?: string) => {
  if (typeof window === 'undefined') return

  // 1. Meta Pixel (Client-Side)
  if (window.fbq) {
    window.fbq('track', 'PageView')
  }

  // 2. Conversion API (Server-Side approach configured from frontend)
  try {
    const eventUrl = stepUrl || window.location.href
    const payload = {
      data: [
        {
          event_name: 'PageView',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: eventUrl,
          user_data: {
            client_user_agent: navigator.userAgent,
          },
        },
      ],
    }

    fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    ).catch((err) => console.error('CAPI fetch error:', err))
  } catch (error) {
    console.error('Meta CAPI Error:', error)
  }
}
