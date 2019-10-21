const dbmiddleware = (schema, table) => {
  return (req, res, next) => {

    // console.log('DBMIDDLEWARE START')
    let result = false

    try {
      schema.validateSync(req.body, { abortEarly: false, context: { tableName: table } })

      // console.log('AFTER DBMIDDLEWARE AWAIT SUCCESS')
      
      result = true

    } catch (validationError) {
      // console.log('VALIDATION ERROR: ', validationError)
      const { errors } = validationError
      // console.log('ERRORS: ', errors)
      // console.log('VALIDATION ERROR: ', validationError)

      const message = errors.join(', ')
      // console.log('error', message)
      // console.log('AFTER DBMIDDLEWARE AWAIT ERROR')
      const { inner } = validationError
      const out = {}

      inner.forEach(err => {
        out[err.path] = err.message
      })

      res.status(422).json({ errors: out }).end()
      // console.log('AFTER DBMIDDLEWARE AWAIT ERROR + RES.STATUS')
    }

    return result
  }
}

export default dbmiddleware