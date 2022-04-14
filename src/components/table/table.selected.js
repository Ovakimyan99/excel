import { $ } from '@core/Dom'

export function tableSelected($root, {selection, event}) {
  if (event.shiftKey) {
    return new Promise(resolve => {
      const end = $(event.target)
      const start = selection.current

      const coordCellStart = start.id(true)
      const coordCellEnd = end.id(true)

      // координаты стартуемой ячейки
      let colEnd
      let rowEnd
      let rowStart
      let colStart

      if (coordCellStart.col < coordCellEnd.col) {
        colStart = coordCellStart.col
        colEnd = coordCellEnd.col
      } else {
        colStart = coordCellEnd.col
        colEnd = coordCellStart.col
      }

      if (coordCellStart.row < coordCellEnd.row) {
        rowStart = coordCellStart.row
        rowEnd = coordCellEnd.row
      } else {
        rowStart = coordCellEnd.row
        rowEnd = coordCellStart.row
      }

      // определяем стартовые позиции
      let cellStart =
        $root.find(getDataIdSelector(rowStart, colStart))
      let parentRow = cellStart.closest('[data-type="resizable"]')
      let coordCell = cellStart.id(true)

      const activeCellsList = []
      activeCellsList.push(cellStart)

      // логика по выделению диапазона
      while (coordCell.col <= colEnd && coordCell.row <= rowEnd) {
        coordCell = cellStart.id(true)

        if (coordCell.col === colEnd) {
          if (coordCell.row !== rowEnd) {
            // если строчка не последняя
            parentRow = parentRow.nextElementSibling
            cellStart =
              parentRow.find(getDataIdSelector(coordCell.row + 1, colStart))
          } else {
            // ячейка последней строчки в последней колонке
            cellStart =
              parentRow.find(getDataIdSelector(coordCell.row, coordCell.col))
            coordCell.col = colEnd + 1
            coordCell.row = rowEnd + 1
          }
        } else {
          cellStart =
            parentRow.find(getDataIdSelector(coordCell.row, coordCell.col + 1))
        }

        activeCellsList.push(cellStart)
      }

      selection.selectGroup(activeCellsList)
      resolve(activeCellsList)
    })
  } else {
    return new Promise(resolve => {
      const $el = $(event.target)
      selection.select($el)

      return resolve($el)
    })
  }
}

function getDataIdSelector(x, y) {
  return `[data-id="${x}:${y}"]`
}
