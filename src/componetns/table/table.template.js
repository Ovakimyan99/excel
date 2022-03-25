const CODES = {
  A: 65,
  Z: 90
}

function toCell(content = '') {
  return `
    <div class="cell" contenteditable>${content}</div>
  `
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

function createRow(num = '', content = '') {
  return `
  <div class="row">
    <div class="row-info">${num}</div>
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

  rows.push(createRow('', cols))

  const cells = new Array(colCount)
      .fill('')
      .map(toCell)
      .join('')

  console.time('create cell')
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells))
  }
  console.timeEnd('create cell')

  return rows.join('')
}
