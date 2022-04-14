import { initialState } from '@redux/initialState'
import { defaultTableTitle } from '@/constants'

const buttons = ['delete', 'exit_to_app']

function createButtonTemplate(str) {
  return `
    <div class="button">
      <i class="material-icons">${str}</i>
    </div>
  `
}

export function createHeader() {
  return `
  <input type="text" class="input"
    value="${initialState.tableTitle || defaultTableTitle}" />
  
  <div>
    ${buttons.map(createButtonTemplate)}
  </div>
`
}