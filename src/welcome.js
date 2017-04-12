const request = require('request');
const querystring = require('querystring');
const env = require('env2')('./config.env');
const dbConnection = require('../database/db_connection.js');

module.exports = {
  method: 'GET',
  path: '/welcome{githubCode?}',
  handler: (req, reply) => {
    request.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.url.query.code}`, (err, response, body) => {
      console.log(body);
      const accessToken = querystring.parse(body).access_token;
      const headers = {
        'User-Agent': 'week8-MZ',
        Authorization: `token ${accessToken}`,
      };
      request.get({ url: 'https://api.github.com/user', headers }, (error, response, bodyString) => {
        if (error) throw error;
        const bodyObject = JSON.parse(bodyString);
        const sqlQuery = `INSERT INTO users (github_username, avatar_url, github_id, access_token) VALUES ('${bodyObject.login}', '${bodyObject.avatar_url}', ${bodyObject.id}, '${accessToken}') ON CONFLICT (github_id) DO UPDATE SET github_username = excluded.github_username, avatar_url = excluded.avatar_url, access_token = excluded.access_token;`;
        console.log(bodyObject);
        dbConnection.query(sqlQuery, (err, res) => {
          if (err) throw err;
          req.cookieAuth.set({
            username: bodyObject.login,
            avatar: bodyObject.avatar_url,
            accessToken,
          });
          reply.view('welcome-user', {
            credentials: req.auth.credentials,
          });
        });
      });
    });
  },
};
