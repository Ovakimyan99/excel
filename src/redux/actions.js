import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES } from '@redux/types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function changeStyles(style) {
  return {
    type: CHANGE_STYLES,
    data: style
  }
}
