const APP_ENV = process.env.NODE_ENV || 'development'
const runMode = process.env.RUN_MODE || 'app'
global.APP_ENV = APP_ENV
const config = require('./config/config').get(APP_ENV)
global.config = config
require('events').EventEmitter.defaultMaxListeners = 5
log.info(`./.env.${APP_ENV}`)
require('dotenv').config({ path: `./.env.${APP_ENV}` })
const Koa = require('koa')
const koaCors = require('@koa/cors')
const { koaBody } = require('koa-body')

const model = require('./models')
model.init()
const server = new Koa()

if (runMode === 'app') {

  server.use(
    koaBody({
      includeUnparsed: true,
      formLimit: '50mb',
      jsonLimit: '50mb',
      textLimit: '50mb',
      multipart: true,
      formidable: {
        uploadDir: './tmp',
        keepExtensions: true
      }
    })
  )

  const options = {
    origin: '*'
  };

  server.use(koaCors(options));
  server.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
  });

  require('./routes')(server)
}

const port = config.ports[runMode]

log.info(`started in ${APP_ENV} env, listening to port ${port}`)
server.listen(port)