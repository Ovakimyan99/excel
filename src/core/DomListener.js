import { capitalize } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw Error('No $root provided for DomListener!')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    // вешать listener на DOM (обертку), который я сюда передаю
    this.listeners.forEach(listener => {
      const method = getEventMethod(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        )
      }

      this[method] = this[method].bind(this)
      // тоже самое что и AddEventListener
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    // удаление прослушивателей
    // что за прослушиватель + у чего удалять
    this.listeners.forEach(listener => {
      const method = getEventMethod(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getEventMethod(listener) {
  return 'on' + capitalize(listener)
}
