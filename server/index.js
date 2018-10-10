const mongoose = require('mongoose')
const cors = require('cors')
const bodyparser = require('body-parser')
const notificationEmitter = require('./services/notification/notification.service')
const routes = require('./routes/routes.model')
const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const { RouteGenerator } = require('dynamic-route-generator')
const { XAuth } = require('x-auth-plugin')

const mongo_uri = process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost:27017/test'

app.disable('etag')
app.use(cors())

app.use(bodyparser.json())

app.use(express.static(path.join(__dirname, '..', 'dist', 'translate')))

mongoose.connect(mongo_uri, { useNewUrlParser: true }).catch(console.log)

XAuth.setupProps({
  appName: 'Translation JSON',
  authSecretKey: process.env.AUTH_SECRET_KEY,
  authSecretKeyForgottenPassword: process.env.AUTH_SECRET_KEY_FORGOTTEN_PASSWORD,
  cookieName: 'translation-json-access',
  cookieNameForgottenPassword: 'translation-json-forgotten-password',
  domainEmail: 'hello@jackthomson.co.uk',
  baseUri: 'api',
  jwtTokenExpiration: 120000, // 2 minutes
  saltWorkFactor: 10,
  databaseUri: mongo_uri,
  themeColour: '#449DD1',
  emailVerification: true,
  passwordStrength: '1',
  refreshTokenExpiration: 3600000, // 1 hour
  refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
  refreshTokenCookieName: 'translation-json-refresh'
})

new RouteGenerator({
  routes: routes,
  app: app,
  baseUri: '/api',
  plugins: {
    pre: [XAuth]
  }
})

app.get('*/', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'translate', 'index.html')))

io.on('connection', (socket) => {
  notificationEmitter.setMaxListeners(0)
  notificationEmitter.on('outsideEvent', (options) => {
    socket.emit('notification', options)
  })
})

server.listen(process.env.PORT || 8080)