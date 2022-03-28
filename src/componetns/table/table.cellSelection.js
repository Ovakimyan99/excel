import { $ } from '@core/Dom'

export function cellSelection(selection, event) {
  const $el = $(event.target)
  selection.select($el)
}
