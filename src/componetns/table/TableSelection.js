export class TableSelection {
  static cellActiveClass = 'selected'

  constructor() {
    this.group = []
  }

  // $el inctanseof DOM === true
  select($el) {
    this.clear()
    this.group.push($el)
    $el.addClass(TableSelection.cellActiveClass)
  }

  clear() {
    for (let i = 0, length = this.group.length; i < length; i++) {
      this.group[i].removeClass(TableSelection.cellActiveClass)
    }
    this.group.length = 0
  }

  selectGroup() {}
}
