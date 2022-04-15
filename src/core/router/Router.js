import { ActiveRoute } from '@core/router/ActiveRoute'
import { $ } from '@core/Dom'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw Error('Надо передать параметр selector')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear()

    const activeParam = ActiveRoute.param
    let Page = this.routes[ActiveRoute.directory]

    if (!Page) {
      Page = this.routes.dashboard
      this.page = new Page(activeParam)
      this.$placeholder.append(this.page.getRoot())
      return
    }

    this.page = new Page(activeParam)

    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }
}
