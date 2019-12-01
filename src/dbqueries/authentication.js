import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const atob = require('atob')


const dbPath = 'src/db/'
const dbFile = 'db.json'
const dbFullPath = dbPath + dbFile

const adapter = new FileSync(dbFullPath)
const db = low(adapter)

const verifyCredentials = (credentials) => {

  if (!credentials) return {
    error: 'No authorization header.'
  }

  try {
    if (credentials.startsWith('Basic ')) {
      const stripped = credentials.replace('Basic ', '')

      const raw = atob(stripped)

      const details = raw.split(':')

      const result = db.get('accounts').find({ username: details[0] }).value()

      if (result) {
        if (result.password === details[1]) {
          return result
        } else {
          return { error: 'Passwords do not match.' }
        }
      } else {
        return { error: 'Username does not exist.' }
      }

    } else {
      return {
        error: 'Only Basic authorization is supported'
      }
    }
  }

  catch (err) {
    console.log(err)
    return {
      error: 'An unknown error occured'
    }
  }
}

export { verifyCredentials }