import { $ } from '@core/Dom'
import { ExcelComponents } from '@core/ExcelComponents';

export class Formula extends ExcelComponents {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  init() {
    super.init()

    this.$formula = this.$root.find('[data-input]')
    this.$emit('formula:input', this.$formula.text())

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })

    this.$subscribe(state => {
      this.$formula.text(state.currentText)
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" data-input contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab'
    ]
    const {key} = event
    if (keys.includes(key)) {
      this.$emit('formula:done', event)
    }
  }
}
