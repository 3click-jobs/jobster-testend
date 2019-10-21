import * as Yup from 'yup'

import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const dbPath = 'src/db/'
const dbFile = 'db.json'
const dbFullPath = dbPath + dbFile

const adapter = new FileSync(dbFullPath)
const db = low(adapter)

const middleware = (schema, property) => {
  return (req, res, next) => {

    schema.validate(req.body, { abortEarly: false })
      .then(value => next())
      .catch(validationError => {
        const { errors } = validationError
        const message = errors.join(', ')
        console.log('error', message)
        res.status(422).json({ error: message })
      })
  }
}



Yup.addMethod(Yup.string, 'isDuplicate', function (message) {

  console.log(message)

  return this.test('isDuplicate', message, function (value) {
    const { path, createError, options } = this

    console.log(options)
    // console.log(this.options.context.tableName)
    const { tableName } = options.context

    console.log('tableName: ', `${tableName}`)
    const result = db.get(tableName).find({ [path]: value }).value()

    if (!result) {
      return true
    } else {
      createError({ path, message })
    }
  })
})

// https://medium.com/@arkadyt/how-does-yup-addmethod-work-creating-custom-validation-functions-with-yup-8fddb71a5470

const schema = {
  registerCompany: Yup.object().shape({
    name: Yup.string()
      .isDuplicate('Duplicate Id - not allowed')
  })

}

schema.registerCompany.validate({ name: 'gofrit' })

schema.registerCompany.validate({ name: 'gofrit' }, { abortEarly: false, context: { tableName: 'companies' } })
.then(value => console.log('hoorah!'))
.catch(validationError => {
  console.log(validationError)
  const { errors } = validationError
  const message = errors.join(', ')
  console.log('error: ', message)
})