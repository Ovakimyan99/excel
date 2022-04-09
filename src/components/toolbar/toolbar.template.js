function toButton(button) {
  const meta = `
    data-type="button"
    data-style='${JSON.stringify(button.value)}'
  `
  return `
    <div
      class="button ${button.active ? 'active' : ''}"
      ${meta}
    >
      <i
        class="material-icons"
        ${meta}
      >${button.icons}</i>
    </div>
  `
}

export function createToolbar() {
  const buttons = [
    {
      icons: 'format_align_left',
      active: true,
      value: {textAlign: 'left'}
    },
    {
      icons: 'format_align_center',
      active: false,
      value: {textAlign: 'center'}
    },
    {
      icons: 'format_align_right',
      active: false,
      value: {textAlign: 'right'}
    },
    {
      icons: 'format_bold',
      active: true,
      value: {fontWeight: 'bold'}
    },
    {
      icons: 'format_italic',
      active: false,
      value: {fontWeight: 'italic'}
    },
    {
      icons: 'format_underlined',
      active: false,
      value: {textDecoration: 'underline'}
    }
  ]
  return buttons.map(toButton).join('')
}
