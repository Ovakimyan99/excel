import { storage } from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {}
}

const storageState = storage('excel-store')
console.log(storageState)

export const initialState = storageState ? storageState : defaultState
