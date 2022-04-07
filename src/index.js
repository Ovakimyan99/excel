import { Excel } from '@/componetns/excel/Excel'
import { Header } from '@/componetns/header/Header'
import { Toolbar } from '@/componetns/toolbar/Toolbar'
import { Formula } from '@/componetns/formula/Formula'
import { Table } from '@/componetns/table/Table'
import { createStore } from '@core/createStore'
import { rootReducer } from '@redux/rootReducer'
import { storage } from '@core/utils'
import { initialState } from '@redux/initialState'
import './scss/style.scss'

const store = createStore(rootReducer, initialState)

store.subscribe(store => {
  storage('excel-store', store)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
