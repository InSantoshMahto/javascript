const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const serve = require('koa-static');
const render = require('koa-ejs');
const path = require('path');
const livereload = require('koa-liverefresh');

const app = new Koa();
const router = new Router();

// importing views
const INDEX = 'index';

// set port
const PORT = process.env.PORT || 80;

// allow cors request
app.use(cors());

// serve static file as a public
app.use(serve(path.join(__dirname, '/public')));

// view engine with ejs rendering
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'ejs',
  delimiter: '%',
  cache: false,
  debug: false,
  async: true,
});

/**
 * @description configure koa-liverefresh
 */ livereload(router, true, {
  public: path.join(__dirname, 'public'),
  views: path.join(__dirname, 'views'),
});

// root get request handler
router.get('/', async ctx => {
  await ctx.render(INDEX);
});

// attached router object with app
app.use(router.routes()).use(router.allowedMethods());

// listen to the server
app.listen(PORT, () => {
  console.log(`server is listening port: ${PORT}`);
});
