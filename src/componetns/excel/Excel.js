import {$} from '@core/Dom'
import { Emitter } from '@/core/Emitter'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const ComponentOptions = {
      emitter: this.emitter
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, ComponentOptions)
      // if (component.name) {
      //   window['cc' + component.name] = component
      // }
      $el.html(component.toHTML())
      $root.append($el)
      return component
    });

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(Component =>Component.init())
  }

  destroy() {
    this.components.forEach(Component =>Component.destroy())
  }
}
