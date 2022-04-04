export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function nextSelector(key, {col, row}) {
  const MIN_VAL = 0
  switch (key) {
    case 'ArrowRight':
    case 'Tab':
      col++
      break
    case 'ArrowDown':
    case 'Enter':
      row++
      break
    case 'ArrowLeft':
      col === 0 ? col = MIN_VAL : col--
      break
    case 'ArrowUp':
      row === 0 ? row = MIN_VAL : row--
      break
  }

  return `[data-id="${row}:${col}"]`
}
