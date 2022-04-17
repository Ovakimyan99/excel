import { createHeader } from '@/components/header/header.template.js'
import { ExcelComponents } from '@core/ExcelComponents';
import { debounce, clearStorage } from '@core/utils'
import { ActiveRoute } from '@core/router/ActiveRoute';
import { defaultTableTitle } from '@/constants'
import { $ } from '@core/Dom'
import * as actions from '@redux/actions'

export class Header extends ExcelComponents {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      subscribe: ['tableTitle'],
      listeners: ['input', 'click'],
      ...options
    })
    this.store = options.store
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    return createHeader(this.store.getState())
  }

  onInput(event) {
    this.$dispatch(actions.changeTableTitle(
        $(event.target).text() || defaultTableTitle
    ))
  }

  onClick(event) {
    const $el = $(event.target)
    const action = $el.data.header

    if (action === 'leave') {
      ActiveRoute.navigate('')
    } else if (action === 'delete') {
      clearStorage('excel:' + ActiveRoute.param)
      ActiveRoute.navigate('')
    }
  }
}
