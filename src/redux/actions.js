import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE
} from '@redux/types'

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

export function applyStyle(data) {
  // data = styles, id
  return {
    type: APPLY_STYLE,
    data
  }
}
