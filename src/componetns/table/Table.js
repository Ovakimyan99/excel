import { ExcelComponents } from '@core/ExcelComponents';
import { $ } from '@core/Dom'
import createTable from './table.template'

export class Table extends ExcelComponents {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      // элемент взаимодейтсвия и координаты
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const type = $resizer.data.resize

      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

      document.onmousemove = e => {
        if (type === 'col') {
          const widthValue = coords.width + (e.pageX - coords.right)
          $parent.css({
            width: widthValue + 'px'
          })

          cells.forEach(cell => {
            $(cell).css({
              width: widthValue + 'px'
            })
          })
        } else {
          const heigthValue = e.clientY - coords.top
          $parent.css({
            height: heigthValue + 'px'
          })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
