import { storage } from '@core/utils'

function getID(str) {
  return Number(str.split(':')[1])
}

function getDateCreateTable(time) {
  const date = new Date(time)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

function tableLinkToHTML(item) {
  const title = storage(item)['tableTitle']
  const lastTimeOpened = storage(item)['openedDate']
  return `
    <li class="db__record">
      <a href="#excel/${getID(item)}">${title}</a>
      <strong>${getDateCreateTable(lastTimeOpened)}</strong>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return '<p>Нет созданных таблиц</p>'
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(tableLinkToHTML).join('')}
    </ul>
  `
}
