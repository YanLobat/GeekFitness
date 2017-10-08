'use strict';

module.exports = () => {
  return async function githubAuthMiddleware(ctx, next) {
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
  }
};
