import { ExcelComponents } from '@core/ExcelComponents'
import { shouldResize, isCell } from './table.functions'
import { TableSelection } from './TableSelection'
import createTable from './table.template'
import { tableSelected } from './table.selected'
import { resizeHandler } from './table.resize'

export class Table extends ExcelComponents {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $el = this.$root.find('[data-id="0:0"]')
    console.log($el)
    this.selection.select($el)
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      tableSelected(this.selection, event)
    }
  }
}
