import { ExcelComponentStore } from '@core/ExcelComponentStore';
import { createToolbar } from '@/components/toolbar/toolbar.template';
import { defaultStyles } from '@/constants'
import { $ } from '@core/Dom'

export class Toolbar extends ExcelComponentStore {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
    this.store = options.store
  }

  prepare() {
    this.initState(defaultStyles)
    const currentStyles = this.store.getState()['currentStyles']
    this.storeChanged({ currentStyles })
  }

  get template() {
    return createToolbar(this.state)
  }

  storeChanged({ currentStyles }) {
    this.setState(currentStyles)
  }

  toHTML() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const style = JSON.parse($target.data.style)
      this.$emit('toolbar:applyStyle', style)
    }
  }
}
