import { Excel } from '@/componetns/excel/Excel'
import { Header } from '@/componetns/header/Header'
import { Toolbar } from '@/componetns/toolbar/Toolbar'
import { Formula } from '@/componetns/formula/Formula'
import { Table } from '@/componetns/table/Table'
import { createStore } from '@core/createStore'
import { rootReducer } from '@reducer/rootReducer'
import './scss/style.scss'

const store = createStore(rootReducer, {
  tableTitle: 'Tigrik',
  colState: {}
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
