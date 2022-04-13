import { $ } from '@core/Dom'
import { ExcelComponents } from '@core/ExcelComponents'
import { shouldResize, isCell, nextSelector } from './table.functions'
import { TableSelection } from './TableSelection'
import createTable from './table.template'
import { tableSelected } from './table.selected'
import { resizeHandler } from './table.resize'
import { defaultStyles } from '@/constants'
import { parse } from '@core/parse'
import * as actions from '@redux/actions'

export class Table extends ExcelComponents {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      subscribe: ['stylesState'],
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

    this.$on('formula:input', (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', (event) => {
      event.preventDefault()
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyles(style)
      this.selection.group.forEach($cell => {
        this.$dispatch(actions.applyStyle({
          style,
          id: $cell.data.id
        }))
      })
    })
  }

  toHTML() {
    return createTable(30, this.store.getState())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)

    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
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
        const selectCells = await tableSelected(this.$root, {
          selection: this.selection,
          event
        })

        if (!selectCells.length) {
          this.selectCell(selectCells)
        } else {
          this.$dispatch(actions.changeStyles(defaultStyles))
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
    if (!event.shiftKey) {
      this.$emit('formula:input', $(event.target).text())
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    if (!event.shiftKey) {
      this.updateTextInStore($(event.target).data.value)
    }
  }
}
