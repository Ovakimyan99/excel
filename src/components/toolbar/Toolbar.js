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
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const style = JSON.parse($target.data.style)
      const key = Object.keys(style)[0]
      this.setState({[key]: style[key]})

      this.$emit('toolbar:applyStyle', style)
    }
  }
}
