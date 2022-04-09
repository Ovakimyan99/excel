import { storage } from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {}
}

const storageState = storage('excel-store')

export const initialState = storageState ? storageState : defaultState
