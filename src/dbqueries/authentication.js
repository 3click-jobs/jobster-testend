import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const atob = require('atob')

const dbPath = 'src/db/'
const dbFile = 'db.json'
const dbFullPath = dbPath + dbFile

// const adapter = new FileSync(dbFullPath)
// const db = low(adapter)

const setupDb = () => {
  // probably not a good idea -- new adapter every time, not sure about release..
  const adapter = new FileSync(dbFullPath)
  const db = low(adapter)
  return db
}

const verifyCredentials = (credentials) => {

  if (!credentials) return {
    error: 'No authorization header.'
  }

  try {
    if (credentials.startsWith('Basic ')) {
      console.log(credentials)
      const stripped = credentials.replace('Basic ', '')

      if (stripped === 'null') {
        console.log('Authorization header is Basic null.')
        return {
          error: 'Authorization header is empty.'
        }
      }

      const raw = atob(stripped)

      const details = raw.split(':')

      console.log('User: ', details[0], ' pass: ', details[1])
      
      const result = setupDb().get('accounts').find({ username: details[0] }).value()

      console.log('RESULT: ', result)
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