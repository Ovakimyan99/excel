import { $ } from '@core/Dom'

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    // элемент взаимодейтсвия и координаты
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    let value

    $resizer.classList.add('active')

    let deltaCol
    let deltaRow

    document.onmousemove = e => {
      if (type === 'col') {
        deltaCol = e.pageX - coords.right
        $resizer.css({right: -deltaCol + 'px'})
      } else {
        deltaRow = e.clientY - coords.bottom
        $resizer.css({bottom: -deltaRow + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      $resizer.classList.remove('active')
      $resizer.css({right: 0})

      if (type === 'col') {
        value = Math.floor(coords.width + deltaCol)
        $parent.css({width: value + 'px'})

        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(cell => {
              $(cell).css({width: value + 'px'})
            })
      } else {
        value = Math.floor(coords.height + deltaRow)
        $parent.css({height: value + 'px'})
        $resizer.css({bottom: 0})
      }
      resolve({
        value,
        id: $parent.data[type],
        type
      })
    }
  })
}