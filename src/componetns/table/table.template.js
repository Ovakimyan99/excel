const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120

function colWidth(state, col) {
  return (state.colState[col] || DEFAULT_WIDTH) + 'px'
}

function toCell(state, row) {
  return function(_, col) {
    const width = colWidth(state, col)
    return `
      <div
        class="cell"
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        style="width: ${width}"
      ></div>
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

function createRow(num, content = '') {
  const resize = num ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
  <div class="row" data-type="resizable">
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
    const width = colWidth(state, index)
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

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colCount)
        .fill('')
        .map(toCell(state, row))
        .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
