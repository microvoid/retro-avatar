import { systemConstants } from './constants'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  // @ts-ignore
  window.gtag('config', systemConstants.GA_TRACKING_ID, {
    page_path: url
  })
}

export type GAEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GAEvent) => {
  // @ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

export const options = () => {
  if (!systemConstants.GA_TRACKING_ID) return null

  return {
    url: `https://www.googletagmanager.com/gtag/js?id=${systemConstants.GA_TRACKING_ID}`,
    html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${systemConstants.GA_TRACKING_ID}', {
  page_path: window.location.pathname,
});`
  }
}
