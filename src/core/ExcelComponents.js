import { DomListener } from '@core/DomListener';

export class ExcelComponents extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.unsubscribes = []
    this.subscribe = options.subscribe || []
    this.store = options.store

    this.prepare()
  }

  // Вывод шаблона HTML
  toHTML() {
    return ''
  }

  // Инициализация до init
  prepare() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  storeChanged() {}

  // Использование событий
  $emit(event, args) {
    this.emitter.emit(event, args)
  }

  // подписка на прослушиватель события
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribes.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Инициализация компонентов и добавление
  // прослушивателей событий
  init() {
    this.initDOMListeners()
  }

  // Уничтожение компонентов
  // Удаление DOM Listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribes.forEach(unsub => unsub())
  }
}
