export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // уведомляет - использование события
  // emitter.subscribe('name-emit', ...args)
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // подписывает на события
  // emitter.subscribe('name-emit', fn)
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
          this.listeners[event].filter(listener => listener !== fn)
    }
  }
}
