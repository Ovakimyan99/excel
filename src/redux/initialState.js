import { defaultStyles } from '@/constants'
import { clone } from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  tableTitle: ''
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitState(state) {
  return state ? normalize(state) : clone(defaultState)
}
