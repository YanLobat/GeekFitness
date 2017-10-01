const https = require('https');
const querystring = require('querystring');
const Koa = require('koa');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const Sequelize = require('sequelize');
const axios = require('axios');

const router = require('./routes');
const { sequelize, User } = require('./db');
const { clientID, clientSecret, stateStr } = require('./config');

const app = new Koa();

app.keys = ['archloh eto pidoras'];

app
  .use(helmet())
  .use(session(app))
  .use(bodyParser())
  .use(async (ctx, next) => {
    const authInfo = ctx.session.github;
    if (authInfo !== undefined){
      ctx.user = authInfo;
      await next();
    }
    else {
      const code = ctx.query.code;
      if (code !== undefined) {
        try {
          const data = {
            "client_id": clientID,
            "client_secret": clientSecret,
            "code": code,
            "state": stateStr
          };

          const responseToken = await axios.post('https://github.com/login/oauth/access_token', data);
          const { access_token, token_type } = querystring.parse(responseToken.data);
          const responseUser = await axios.get(`https://api.github.com/user?access_token=${access_token}`, {
            headers: {
              "Authorization": `token ${access_token}`
            }
          });
          const username = responseUser.data.login;
          ctx.session.github = { access_token, username };
          console.log(ctx.session, 'Session is');
          const user = await User.create({ "username": username });
        }
        catch (err) {
          console.log(err, 'Error occured');
          await next(err);
        }
      }
      else {
        ctx.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}&state=${stateStr}`);
      }
    }
  })
  .use(router.routes())
  .use(router.allowedMethods())

sequelize
  .sync({force: true})
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    throw new Error(err);
  });
