const env = require('env2')('./config.env');

const login = ({
  path: '/login',
  method: 'GET',
  config: {
    auth: false,
  },
  handler: (request, reply) => {
    reply.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.BASE_URL}/welcome`);
  },
});

module.exports = login;
