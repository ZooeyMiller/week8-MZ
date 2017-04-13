const dbConnection = require('../database/db_connection.js');

module.exports = (req, reply) => {
  const name = req.auth.credentials.username;
  dbConnection.query(`INSERT INTO posts (title, body, user_id) VALUES ('${req.payload.title}', '${req.payload.body}', (SELECT user_id FROM users WHERE users.github_username = '${name}'));`, (err, res) => {
    if (err) {
      return err;
    }
    reply.redirect('/', {
      credentials: req.auth.credentials,
    });
  });
};
