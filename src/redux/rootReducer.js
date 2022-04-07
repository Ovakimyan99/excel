import { TABLE_RESIZE } from '@redux/types'

export function rootReducer(state, action) {
  let field
  let prevVal
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      prevVal = state[field]
      prevVal[action.data.id] = action.data.value

      return {...state, [field]: prevVal } // id, val
    default: return state
  }
}
