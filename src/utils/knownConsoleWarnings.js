const KNOWN_WARNING_MESSAGES = [
  'THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.',
]

export function installKnownConsoleWarningFilter() {
  if (typeof window === 'undefined' || window.__PRISM_GUARD_PROMO_WARNING_FILTER__) {
    return
  }

  const originalWarn = console.warn.bind(console)

  console.warn = (...args) => {
    const message = args.map((arg) => String(arg)).join(' ')

    if (KNOWN_WARNING_MESSAGES.some((knownWarning) => message.includes(knownWarning))) {
      return
    }

    originalWarn(...args)
  }

  window.__PRISM_GUARD_PROMO_WARNING_FILTER__ = true
}
