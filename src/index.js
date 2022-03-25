import { Excel } from '@/componetns/excel/Excel'
import { Header } from '@/componetns/header/Header'
import { Toolbar } from '@/componetns/toolbar/Toolbar'
import { Formula } from '@/componetns/formula/Formula'
import { Table } from '@/componetns/table/Table'
import './scss/style.scss'

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
})

excel.render()
