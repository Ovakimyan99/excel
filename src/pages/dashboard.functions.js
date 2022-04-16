import { storage } from '@core/utils'

function getTime(str) {
  return Number(str.split(':')[1])
}

function getDateCreateTable(time) {
  const regular = /\//g
  return new Date(time)
      .toLocaleDateString(
          'en-GB',
          { month: 'numeric', day: 'numeric', year: 'numeric' }
      ).replace(regular, '.')
}

function tableLinkToHTML(item, index) {
  const time = getTime(item)
  const title = storage(item)['tableTitle']
  return `
    <li class="db__record">
      <a href="#excel/${time}">${title}</a>
      <strong>${getDateCreateTable(time)}</strong>
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
