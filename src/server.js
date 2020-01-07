const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('src/db/db.json')
const middlewares = jsonServer.defaults()

import dbmiddleware from './dbqueries/dbmiddleware'
import { dbschemas } from './dbqueries/dbschemas'

const middleware = require('./yup/middleware')
import schemas from './yup/schemas'

import { reset, clear, addPerson, addCompany } from './dbutils/dbutils'
import { verifyCredentials } from './dbqueries/authentication'

server.use(middlewares)
server.use(jsonServer.bodyParser)

// add custom routes before JSON Server router

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.get('/reset', (req, res) => {
  reset()
  router.db.read('src/db/db.json')
  res.jsonp({ status: 'db reset to init state' })
})

server.get('/clear', (req, res) => {
  clear()
  router.db.read('src/db/db.json')
  res.jsonp({ status: 'db set to a clean state' })
})

server.get('/verify', (req, res) => {
  const result = verifyCredentials(req.headers.authorization)
  if (result.error) {
    res.status(404).jsonp({...result})
  } else {
    res.jsonp({...result})
  }
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
        break
      }
      case '/jobster/users/persons': {
        // dto validation

        if (!middleware(schemas.registerPerson)(req, res, next)) {
          return
        }

        if (!dbmiddleware(dbschemas.registerPerson, 'persons')(req, res, next)) {
          return
        }
        // if (res.status) return

        // check if email exists with companies

        // check if mobile phone exists

        // check if company id (companyRegistrationNumber) exists

        // check if access role is ROLE_USER

        // check if username exists

        // number format exceptions
        break
      }
      case '/jobster/accounts': {

        if (!middleware(schemas.registerAccount)(req, res, next)) {
          return
        }

        if (!dbmiddleware(dbschemas.registerAccount, 'accounts')(req, res, next)) {
          return
        }
        break
      }
      case '/jobster/jobTypes': {

        if (!middleware(schemas.registerJobType)(req, res, next)) {
          return
        }

        if (!dbmiddleware(dbschemas.registerJobType, 'jobTypes')(req, res, next)) {
          return
        }
        break
      }
      case '/jobster/seeks': {

        if (!middleware(schemas.registerSeek)(req, res, next)) {
          return
        }

        if (!dbmiddleware(dbschemas.registerSeek, 'seeks')(req, res, next)) {
          return
        }
        break
      }
      case '/jobster/offers': {

        if (!middleware(schemas.registerOffer)(req, res, next)) {
          return
        }

        if (!dbmiddleware(dbschemas.registerOffer, 'offers')(req, res, next)) {
          return
        }
        break
      }
      default: {
        break
      }
    }
    console.log('BEFORE NEXT')
  }

  next()
})

// manual addition of a person and a company
server.use((req, res, next) => {
  console.log(req.path)

  if (req.method === 'POST') {
    switch (req.path) {
      case '/jobster/users/persons': {
        // This is where i must write to the 'database' by hand...

        const result = addPerson(req.body)
        res.status(201).json({ ...result }).end()

        // without this line manual changes won't be reflected!
        router.db.read('src/db/db.json')
        return
      }      
      case '/jobster/users/companies': {
        
        const result = addCompany(req.body)
        res.status(201).json({ ...result }).end()

        // without this line manual changes won't be reflected!
        router.db.read('src/db/db.json')
        return
      }
      default: {
        break
      }
    }
    console.log('BEFORE NEXT')
  }

  next()
})

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
  // persons
  '/jobster/users/persons': '/persons',
  '/jobster/users/persons/:id': '/persons/:id',
  // accounts
  '/jobster/accounts': '/accounts',
  '/jobster/accounts/:id': '/accounts/:id',
  // jobTypes
  '/jobster/jobTypes': '/jobTypes',
  '/jobster/jobTypes/:id': '/jobTypes/:id',
  // seek
  '/jobster/seeks': '/seeks',
  '/jobster/seeks/:id': '/seeks/:id',  
  // offer
  '/jobster/offers': '/offers',
  '/jobster/offers/:id': '/offers/:id',    
}))

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})