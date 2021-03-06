import {$} from '@core/Dom'
import { Emitter } from '@/core/Emitter'
import { StoreChanged } from '@core/StoreChanged'
import { updateDateOpenedTable } from '@redux/actions'
import { preventDefault } from '@core/utils'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.emitter = new Emitter()
    this.store = options.store
    this.subscriber = new StoreChanged(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const ComponentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, ComponentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault)
    }
    this.store.dispatch(updateDateOpenedTable())
    this.subscriber.subscriberComponents(this.components)
    this.components.forEach(Component => Component.init())
  }

  destroy() {
    this.subscriber.subscriberComponents()
    this.components.forEach(Component => Component.destroy())
    document.removeEventListener('contextmenu', preventDefault)
  }
}
