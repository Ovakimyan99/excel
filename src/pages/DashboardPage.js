import { createRecordTable } from '@/pages/dashboard.functions.js'
import { createEcxelID } from '@core/utils'
import { Page } from '@core/Page'
import { $ } from '@core/Dom'

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel Dashboard</h1>
      </div>

      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${createEcxelID()}" class="db__create">
            Новая <br /> Таблица
          </a>
        </div>
      </div>

      <div class="db__table db__view">
        ${ createRecordTable() }
      </div>
    `)
  }
}
