import {trackPageview, trackEvent, trackCodeEvent} from "./analytics-api";

export const initAnalytics = (userId: string, url: string, ctaSelector: string): (data: string) => void => {
  const loadPage = () => trackPageview({ts: Date.now(), url, type: 'load', userId})
  const clickCta = () => trackEvent({ts: Date.now(), url, type: 'click', userId})
  const unloadPage = () => {
    window.removeEventListener('load', loadPage)
    window.removeEventListener('click', clickCta)
    window.removeEventListener('beforeunload', unloadPage)

    trackPageview({ts: Date.now(), url, type: 'unload', userId})
  }

  window.addEventListener('load', loadPage)

  const ctaButton = document.querySelector(`[${ctaSelector}]`)
  if (ctaButton) ctaButton.addEventListener('click', clickCta)

  window.addEventListener('beforeunload', unloadPage)

  return (data: string) => trackCodeEvent({ts: Date.now(), url, userId, data})
}