const hapi = require('hapi');
const inert = require('inert');
const routes = require('./routes');
const vision = require('vision');
const Handlebars = require('handlebars');
const cookieAuth = require('hapi-auth-cookie');
const hapiAuth = require('hapi-auth-basic');
const env = require('env2')('./config.env');

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 4000,
  state: {
    isSameSite: 'Lax',
  },
});

server.register([inert, vision, hapiAuth, cookieAuth], (err) => {
  if (err) throw err;

  const options = {
    password: process.env.COOKIE_PASSWORD,
    cookie: 'logged-in',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000,
  };

  server.auth.strategy('base', 'cookie', 'optional', options);


  server.views({
    engines: { hbs: Handlebars },
    path: 'views',
    layout: 'default',
    layoutPath: 'views/layouts',
    partialsPath: 'views/partials',
  });


  server.route(routes);
});

module.exports = server;
