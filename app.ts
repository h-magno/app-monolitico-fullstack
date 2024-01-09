import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import AdminJSMongoose from '@adminjs/mongoose'
import express from 'express'
import { User } from './models/user.entity' 
import { Role } from './models/role.entity'
import { Document } from './models/document.entity'
import UserController from './controllers/UserController'
import session from 'express-session'
import hbs from 'hbs'
import cors from 'cors'
import document from './routes/document'
import auth from './routes/auth'

require('dotenv').config()

const bcrypt = require('bcryptjs')
const mysqlStore = require('express-mysql-session')(session)
const PORT = 3002
const ROOT_DIR = __dirname
const path = require('node:path')



AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database
}) 

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database
})

const sessionStore = new mysqlStore({
  connectionLimit: 10,
  password: process.env.SQL_DB_PASS ,
  user: process.env.SQL_DB_USER ,
  database: process.env.SQL_DB_NAME ,
  host: process.env.SQL_DB_HOST ,
  port: process.env.SQL_DB_PORT , 
  createDatabaseTable: true 
   
})
 

const generateResource = (Model: object, propreties: any = {}, action:any = {}) => {
  return {
    resource: Model,
    options: {
      properties: {
        ...propreties,
        createdAt: {
          isVisible: {
            list: true, edit: false, create: false, show: true
          }
        },
        updatedAt: {
          isVisible: {
            list: true, edit: false, create: false, show: true
          } 
        }  
      },
      actions: {
        ...action
      }
    }
  }
}





const start = async () => {
  const app = express()

    const adminOptions = {
      resources: [
        generateResource(Role),
        generateResource(User, 
          {
          password: {type: 'password'},
          token: {
            isVisible: {
              list: false, edit: false, create: false, show: false
            }
          },
          active: {
            isVisible: {
              list: false, edit: false, create: false, show: false
            }
          }
          },
          {
            new: {
              before: async(request: any) => {
                console.log('antes de salvar')
                if (request.payload.password) {
                  request.payload.password = await bcrypt.hashSync(request.payload.password, 10)
                }
                return request
              },
              after: async(originalResponse: any, request: any, context: any) => {
                console.log('depois de salvar')
                console.log(originalResponse.record.params)
                // console.log(request.payload)
                // console.log(context)
                return originalResponse
              }
            }
          }
        ),
        generateResource(Document),
      ],
      dashboard: {
        component: AdminJS.bundle('./components/Dashboard')
      },
      //TODO: Login não aceita outro roothPath além de /admin'
      rootPath: '/admin',
      branding: {
        companyName: 'OnlineDocs',
        logo: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/TK_archive_icon.svg/1024px-TK_archive_icon.svg.png`,
        favicon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/TK_archive_icon.svg/1024px-TK_archive_icon.svg.png'
      }
    }

  const admin = new AdminJS(adminOptions)

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
     authenticate: async (email, password) => {

        const userCtrl = new UserController()

        return await userCtrl.login(email, password)
     },
     cookieName: 'adminjs-internal-admin',
     cookiePassword: '12345678'
  },
  null,
  {
    store: sessionStore, 
    resave: true,
    saveUninitialized: true,
    secret: 'VAkDvinpGSf441iXdExSrQaQxLzb5JNT',
    cookie: {
      httpOnly: process.env.NODE_ENV !== 'production',
      secure: process.env.NODE_ENV === 'production',
    },
    name: 'adminjs-internal-admin'
  }
  
  )
  app.use(cors())
  app.use(express.json())
  hbs.registerPartials(path.join(ROOT_DIR, 'views'))
  app.set('view engine', '.hbs')
  

  app.use(admin.options.rootPath, adminRouter)
  app.use('/document', document)
  app.use('/auth', auth)

 
  
  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start() 

