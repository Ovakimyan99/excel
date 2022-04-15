export class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw Error('Для страницы необходимо создать метод getRoot')
  }

  afterRender() {}

  destroy() {}
}
