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

const addPerson = (person) => {
  // create new id
  // alternatives are shortid and lodash-id
  const personIds = db.get('persons').map('id').value()
  const accountIds = db.get('accounts').map('id').value()

  let newPersonId;
  let newAccountId;

  // sort reverse so you can access largest id by index 0
  if (personIds.length > 0) {
    personIds.sort((a, b) => b - a)
    newPersonId = personIds[0] + 1
  } else {
    newPersonId = 1
  }

  if (accountIds.length > 0) {
    accountIds.sort((a, b) => b - a)
    newAccountId = accountIds[0] + 1
  } else {
    newAccountId = 1
  }

  // create new entities
  const newPerson = {...person, id: newPersonId}
  const newAccount = {
    username: newPerson.username,
    password: newPerson.password,
    confirmedPassword: newPerson.confirmedPassword,
    accessRole: 'ROLE_USER',
    user: {...newPerson},
    id: newAccountId
  }

  // write data to person
  db.get('persons').push({...newPerson}).write()
  // write data to account
  db.get('accounts').push({...newAccount}).write()

  // return created entity with id 
  return {...newPerson}
}

const addCompany = (company) => {
  // create new id
  // alternatives are shortid and lodash-id
  const companyIds = db.get('companies').map('id').value()
  const accountIds = db.get('accounts').map('id').value()

  let newCompanyId;
  let newAccountId;

  // sort reverse so you can access largest id by index 0
  if (companyIds.length > 0) {
    companyIds.sort((a, b) => b - a)
    newCompanyId = companyIds[0] + 1
  } else {
    newCompanyId = 1
  }

  if (accountIds.length > 0) {
    accountIds.sort((a, b) => b - a)
    newAccountId = accountIds[0] + 1
  } else {
    newAccountId = 1
  }

  // create new entities
  const newCompany = {...company, id: newCompanyId}
  const newAccount = {
    username: newCompany.username,
    password: newCompany.password,
    confirmedPassword: newCompany.confirmedPassword,
    accessRole: 'ROLE_USER',
    user: {...newCompany},
    id: newAccountId
  }

  // write data to person
  db.get('companies').push({...newCompany}).write()
  // write data to account
  db.get('accounts').push({...newAccount}).write()

  // return created entity with id 
  return {...newCompany}
}

export { reset, clear, addPerson, addCompany }