import { storage } from '@core/utils'
import { defaultStyles } from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  tableTitle: ''
}

const storageState = storage('excel-store')

export const initialState = storageState ? storageState : defaultState
