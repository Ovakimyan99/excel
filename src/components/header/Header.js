import { createHeader } from '@/components/header/header.template.js'
import { ExcelComponents } from '@core/ExcelComponents';
import { $ } from '@core/Dom'
import * as actions from '@redux/actions'

export class Header extends ExcelComponents {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      subscribe: ['tableTitle'],
      listeners: ['input'],
      ...options
    })
  }

  init() {
    super.init()

    this.$on('header:title', title => {
      this.$dispatch(actions.changeTableTitle(title))
    })
  }

  toHTML() {
    return createHeader()
  }

  onInput(event) {
    this.$emit('header:title', $(event.target).text())
  }
}
