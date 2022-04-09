import { ExcelComponents } from '@core/ExcelComponents';
import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/Dom'

export class Toolbar extends ExcelComponents {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  toHTML() {
    return createToolbar()
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      console.log($target.data.style)
    }
  }
}
