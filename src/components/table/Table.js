import { $ } from '@core/Dom'
import { ExcelComponents } from '@core/ExcelComponents'
import { shouldResize, isCell, nextSelector } from './table.functions'
import { TableSelection } from './TableSelection'
import createTable from './table.template'
import { tableSelected } from './table.selected'
import { resizeHandler } from './table.resize'
import { defaultStyles } from '@/constants'
import * as actions from '@redux/actions'

export class Table extends ExcelComponents {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.store = options.store
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
      this.updateTextInStore(this.selection.current)
    })

    this.$on('formula:done', (event) => {
      event.preventDefault()
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyles(style)
    })
  }

  toHTML() {
    return createTable(30, this.store.getState())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)

    $cell.getStyles(Object.keys(defaultStyles))
  }

  async resizeTable(event) {
    const res = await resizeHandler(this.$root, event)
    this.$dispatch(actions.tableResize(res))
  }

  async onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      try {
        const selectCell = await tableSelected(this.$root, {
          selection: this.selection,
          event
        })

        if (selectCell) {
          this.selectCell(selectCell)
        }
      } catch (error) {
        console.warn(error)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
      'Enter',
      'Tab'
    ]

    const { key } = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
      return
    }
    this.$emit('formula:input', $(event.target).text())
  }

  updateTextInStore($cell) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value: $cell.text()
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target))
  }
}
