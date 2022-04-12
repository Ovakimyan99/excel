import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE
} from '@redux/types'

export function rootReducer(state, action) {
  let field
  let id
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: value(state, field, action) }
    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        dataState: value(state, field, action),
        currentText: action.data.value
      }
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'stylesState'
      id = `${action.data.id}`
      return {
        ...state,
        currentStyles: {
          ...state['currentStyles'],
          ...action.data.style
        },
        [field]: {
          ...state[field],
          [id]: {
            ...state[field][id],
            ...action.data.style
          }
        }
      }
    default: return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
