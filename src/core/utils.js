// Pure functions (из функционального программирования)
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  return localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDachCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function stylesToString(stylesObject) {
  return Object.keys(stylesObject)
      .map(key => `${camelToDachCase(key)}: ${stylesObject[key]}`)
      .join(';')
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearInterval(timeout)
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, ...args)
    }

    clearInterval(timeout)
    timeout = setTimeout(later, wait)
  }
}
