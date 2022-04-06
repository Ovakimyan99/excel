export function rootReducer(state, action) {
  let prevVal
  switch (action.type) {
    case 'RESIZE_HANDLER':
      prevVal = state.colState || {}
      prevVal[action.data.id] = action.data.value
      return {...state, colState: prevVal}
    default: return state
  }
}