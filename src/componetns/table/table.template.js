const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function colWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function rowHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const width = colWidth(state.colState, col)
    return `
      <div
        class="cell"
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        style="width: ${width};"
      >${data || ''}</div>
    `
  }
}

function toColumn({col, index, width}) {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="
        width: ${width}
      "
    >
      ${col.trim()}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(num, content = '', state) {
  const height = rowHeight(state, num)
  const resize = num ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
  <div
    class="row"
    data-type="resizable"
    data-row="${num || ''}"
    style="height: ${height}"
  >
    <div class="row-info">
      ${num || ''}
      ${resize}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col, index) {
    const width = colWidth(state.colState, index)
    return { col, index, width }
  }
}

export default function createTable(rowsCount = 15, state) {
  const rows = []
  const colCount = CODES.Z - CODES.A + 1

  const cols = new Array(colCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colCount)
        .fill('')
        .map(toCell(state, row))
        .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
