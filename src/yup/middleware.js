// import * as Yup from 'yup'

const middleware = (schema, property) => {
  return (req, res, next) => {

    // console.log('MIDDLEWARE START')
    let result = false

    try {
      schema.validateSync(req.body, { abortEarly: false })

      // console.log('AFTER MIDDLEWARE AWAIT SUCCESS')

      result = true
      // next()
    } catch (validationError) {
      const { errors } = validationError
      const message = errors.join(', ')
      // console.log('error', message)


      // in inner: path, message...
      // create an errors object with path as key and message as value..
      const { inner } = validationError
      const out = {}

      inner.forEach(err => {
        out[err.path] = err.message
      })

      // console.log(validationError)

      // console.log('AFTER MIDDLEWARE AWAIT ERROR')
      res.status(422).json({ errors: out }).end()
      // console.log('AFTER MIDDLEWARE AWAIT ERROR + RES.STATUS')
    }

    return result
  }
}

module.exports = middleware;