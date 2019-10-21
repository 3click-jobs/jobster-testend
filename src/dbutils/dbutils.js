// https://stackabuse.com/reading-and-writing-json-files-with-node-js/
import fs from 'fs'

let rawinit = fs.readFileSync('src/db/init.json')
let rawempty = fs.readFileSync('src/db/empty.json')
let init = JSON.parse(rawinit)
let empty = JSON.parse(rawempty)

import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const dbPath = 'src/db/'
const dbFile = 'db.json'
const dbFullPath = dbPath + dbFile

const adapter = new FileSync(dbFullPath)
const db = low(adapter)

const reset = () => {
  const newState = {...init}
  db.setState(newState)
  db.write()
}

const clear = () => {
  const newState = {...empty}
  db.setState(newState)
  db.write()
}

export { reset, clear }