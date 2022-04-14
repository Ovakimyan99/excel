import { DashboardPage } from '@/pages/DashboardPage'
import { ExcelPage } from '@/pages/ExcelPage'
import { Router } from '@core/router/Router'
import './scss/style.scss'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
})
