const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('src/db/db.json')
const middlewares = jsonServer.defaults()



import dbmiddleware from './dbqueries/dbmiddleware'
import { dbschemas } from './dbqueries/dbschemas'

const middleware = require('./yup/middleware')
import schemas from './yup/schemas'

import { reset, clear } from './dbutils/dbutils'

server.use(middlewares)
server.use(jsonServer.bodyParser)

// add custom routes before JSON Server router

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.get('/reset', (req, res) => {
  reset()
  router.db.read('src/db/db.json')
  res.jsonp({ status: 'db reset to init state'})
})

server.get('/clear', (req, res) => {
  clear()
  router.db.read('src/db/db.json')
  res.jsonp({ status: 'db set to a clean state'})
})

server.use((req, res, next) => {
  console.log(req.path)

  if (req.method === 'POST') {
    switch (req.path) {
      case '/jobster/users/companies': {
        // dto validation

        if (!middleware(schemas.registerCompany)(req, res, next)) {
          return
        }
        
        if (!dbmiddleware(dbschemas.registerCompany, 'companies')(req, res, next)) {
          return
        }
        // if (res.status) return

        // check if email exists with companies

        // check if mobile phone exists

        // check if company id (companyRegistrationNumber) exists

        // check if access role is ROLE_USER

        // check if username exists

        // number format exceptions
      }
      default: {
        break
      }
    }
    console.log('BEFORE NEXT')
  }

  next()
})

// these archived and deleted subpaths should just use query params

server.use(jsonServer.rewriter({
  // '/jobster/*': '/$1',
  '/jobster/users/companies': '/companies',
  '/jobster/users/companies/:id': '/companies/:id',
  '/jobster/users/companies/archived': '/companiesArchived',
  '/jobster/users/companies/archive/:id': '/companies/:id',
  '/jobster/users/companies/archived/:id': '/companiesArchived/:id',
  '/jobster/users/companies/deleted': '/companiesDeleted',
  '/jobster/users/companies/deleted/:id': '/companiesDeleted/:id',
  '/jobster/users/companies/undelete/:id': '/companiesDeleted/:id',

}))

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})