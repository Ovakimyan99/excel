import { $ } from '@core/Dom'

export function resizeHandler($root, event) {
  // элемент взаимодейтсвия и координаты
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize

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
      const widthValue = coords.width + deltaCol
      $parent.css({width: widthValue + 'px'})

      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(cell => {
            $(cell).css({width: widthValue + 'px'})
          })
    } else {
      $parent.css({height: coords.height + deltaRow + 'px'})
      $resizer.css({bottom: 0})
    }
  }
}