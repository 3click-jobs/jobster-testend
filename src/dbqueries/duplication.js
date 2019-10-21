import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const dbPath = 'src/db/'
const dbFile = 'db.json'
const dbFullPath = dbPath + dbFile

const adapter = new FileSync(dbFullPath)
const db = low(adapter)

const result = db.get('companies').find({ id: 3 }).value()
console.log(result)

const setupDb = () => {
  // probably not a good idea -- new adapter every time, not sure about release..
  const adapter = new FileSync(dbFullPath)
  const db = low(adapter)
  return db
}

const hasId = (id) => {
  const result = db.get('companies').find({ id: id }).value()

  if (result) {
    return true
  } else {
    return false
  }
}

export { hasId }