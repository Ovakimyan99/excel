export class TableSelection {
  static cellActiveClass = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  // $el inctanseof DOM === true
  select($el) {
    this.clear()
    $el.addClass(TableSelection.cellActiveClass)
    this.group.push($el)
    this.current = $el
  }

  clear() {
    for (let i = 0, length = this.group.length; i < length; i++) {
      this.group[i].removeClass(TableSelection.cellActiveClass)
    }
    this.group.length = 0
  }

  selectGroup(activeCellsList) {
    this.clear()

    this.group = [...activeCellsList]
    for (const $el of this.group) {
      $el.addClass(TableSelection.cellActiveClass)
    }
  }
}
