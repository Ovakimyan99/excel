import { $ } from '@core/Dom'

export function tableSelected(selection, event) {
  const $el = $(event.target)
  selection.select($el)
}
