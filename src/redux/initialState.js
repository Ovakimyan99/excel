import { defaultTableTitle } from '@/constants'
import { defaultStyles } from '@/constants'
import { clone } from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  tableTitle: defaultTableTitle,
  openedDate: new Date().toJSON()
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitState(state) {
  return state ? normalize(state) : clone(defaultState)
}
