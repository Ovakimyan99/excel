export function createStore(rootReducer, initState = {}) {
  let state = rootReducer({...initState}, { type: '__INIT__' })
  let lisneters = []

  return {
    subscribe(fn) {
      lisneters.push(fn)
      return {
        unsubscribe() {
          lisneters = lisneters.filter(l => l !== fn)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      lisneters.forEach(lisneter => lisneter(state))
    },
    getState() {
      return state
    }
  }
}
