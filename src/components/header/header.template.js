const buttons = [
  {
    icon: 'delete',
    action: 'delete'
  },
  {
    icon: 'exit_to_app',
    action: 'leave'
  }
]

function createButtonTemplate({icon, action}) {
  return `
    <div class="button" data-header="${action}">
      <i class="material-icons" data-header="${action}">${icon}</i>
    </div>
  `
}

export function createHeader({ tableTitle }) {
  return `
  <input type="text" class="input"
    value="${tableTitle}" />
  
  <div>
    ${buttons.map(createButtonTemplate).join('')}
  </div>
`
}