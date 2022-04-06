import { TABLE_RESIZE } from '@redux/types'

export function rootReducer(state, action) {
  let prevVal
  switch (action.type) {
    case TABLE_RESIZE:
      prevVal = state.colState || {}
      prevVal[action.data.id] = action.data.value
      return {...state, colState: prevVal} // id, val
    default: return state
  }
}
