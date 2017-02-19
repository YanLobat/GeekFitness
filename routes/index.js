const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = {
    message: 'Hey, welcome to the Koa v2 starter!'
  };
  ctx.status = 200;
  await next();
});

module.exports = router;
