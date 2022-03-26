const CODES = {
  A: 65,
  Z: 90
}

function toCell(content = '', index) {
  return `
    <div class="cell" contenteditable data-col="${index}">${content}</div>
  `
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
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

export default function createTable(rowsCount = 15) {
  const rows = []
  const colCount = CODES.Z - CODES.A + 1

  const cols = new Array(colCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  const cells = new Array(colCount)
      .fill('')
      .map(toCell)
      .join('')

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
