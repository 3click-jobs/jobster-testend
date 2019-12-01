import * as Yup from 'yup'

import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const dbPath = 'src/db/'
const dbFile = 'db.json'
const dbFullPath = dbPath + dbFile

const adapter = new FileSync(dbFullPath)
const db = low(adapter)

Yup.addMethod(Yup.mixed, 'isDuplicate', function (message) {

  return this.test('isDuplicate', message, function (value) {
    const { path, createError, options } = this

    // When there is no Id provided
    if (!value) {
      return true
    }

    // OK!!!
    db.read()

    const { tableName } = options.context

    // console.log('DB: ', db.get(tableName).value())

    const result = db.get(tableName).find({ [path]: value }).value()
    // console.log('VALUE AT RESULT', value, result)
    // console.log('RESULT: ', result)

    if (!result) {
      // console.log('WHY HERE?')
      return true
    } else {
      // console.log('WHY NOT HERE?', message)
      createError({ path, message })
    }
  })
})

Yup.addMethod(Yup.string, 'isParsableToInt', function (message) {

  return this.test('isParsableToInt', message, function (value) {
    const { path, createError } = this

    const result = Number(value)

    // console.log('MESSAGE: ', message, 'RESULT: ', result)

    if (!isNaN(result)) {
      return true
    } else {
      // console.log('WHY NOT HERE?', message)
      createError({ path, message })
    }
  })
})

Yup.addMethod(Yup.string, 'isParsableToFloat', function (message) {

  return this.test('isParsableToFloat', message, function (value) {
    const { path, createError, options } = this

    const result = Number(value)

    if (!isNaN(result)) {
      return true
    } else {
      // console.log('WHY NOT HERE?', message)
      createError({ path, message })
    }
  })
})

const dbschemas = {
  registerCompany: Yup.object().shape({
    email: Yup.string()
      .isDuplicate('Email has been used. Choose another email.'),
    mobilePhone: Yup.string()
      .isDuplicate('Mobile phone is alredy registered. You cannot register multiple companies with one mobile phone.'),
    companyName: Yup.string()
      .isDuplicate('Duplicate Company name is not allowed'),
    username: Yup.string()
      .isDuplicate('Username exists. Choose another username.'),
    id: Yup.number()
      .isDuplicate('Duplicate Id not allowed'),
    companyRegistrationNumber: Yup.string()
      .isParsableToInt('Number conversion error'),
    accessRole: Yup.string()
      .oneOf(['ROLE_USER'], 'Access role MUST be of a user.')
  }),
  registerPerson: Yup.object().shape({
    email: Yup.string()
      .isDuplicate('Email has been used. Choose another email.'),
    mobilePhone: Yup.string()
      .isDuplicate('Mobile phone is alredy registered. You cannot register multiple companies with one mobile phone.'),
    companyName: Yup.string()
      .isDuplicate('Duplicate Company name is not allowed'),
    username: Yup.string()
      .isDuplicate('Username exists. Choose another username.'),
    // id: Yup.number()
    //   .isDuplicate('Duplicate Id not allowed'),
    // companyRegistrationNumber: Yup.string()
    //   .isParsableToInt('Number conversion error'),
    accessRole: Yup.string()
      .oneOf(['ROLE_USER'], 'Access role MUST be of a user.')
  }),
  registerAccount: Yup.object().shape({
    username: Yup.string()
      .isDuplicate('Username exists. Choose another username.') 
  })
};

export { dbschemas }