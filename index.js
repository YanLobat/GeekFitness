const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  console.log('logging request');
  ctx.body = 'Hello Koa';
});
