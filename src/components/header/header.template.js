import { defaultTableTitle } from '@/constants'

const buttons = ['delete', 'exit_to_app']

function createButtonTemplate(str) {
  return `
    <div class="button">
      <i class="material-icons">${str}</i>
    </div>
  `
}

export function createHeader({ tableTitle }) {
  return `
  <input type="text" class="input"
    value="${tableTitle || defaultTableTitle}" />
  
  <div>
    ${buttons.map(createButtonTemplate)}
  </div>
`
}