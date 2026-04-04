// Domain detection utility
export function getDomain(): 'ampliyouth' | 'ysdi' | 'dev' {
  const hostname = window.location.hostname
  if (hostname.includes('ampliyouth.org')) return 'ampliyouth'
  if (hostname.includes('ysdiinitiative.org')) return 'ysdi'
  // For development, check URL param or default
  const params = new URLSearchParams(window.location.search)
  const domain = params.get('domain')
  if (domain === 'ysdi') return 'ysdi'
  return 'ampliyouth' // default in dev
}

export function isAmpliYouth(): boolean {
  return getDomain() === 'ampliyouth' || getDomain() === 'dev'
}

export function isYSDI(): boolean {
  return getDomain() === 'ysdi'
}

export const SITE_CONFIG = {
  ampliyouth: {
    name: 'AmpliYouth Advocacy Academy',
    short: 'AmpliYouth',
    tagline: 'Building Africa\'s Next Generation of Changemakers',
    primaryColor: '#16a34a',
    email: 'info@ampliyouth.org',
    domain: 'ampliyouth.org',
  },
  ysdi: {
    name: 'YSDI Initiative',
    short: 'YSDI',
    tagline: 'Youth Sustainable Development Initiative',
    primaryColor: '#7c3aed',
    email: 'info@ysdiinitiative.org',
    domain: 'ysdiinitiative.org',
  },
}
