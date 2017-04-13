const addPost = require('./addPost');
const dbConnection = require('../database/db_connection.js');
const login = require('./login.js');
const welcome = require('./welcome.js');

const home = {
  method: 'GET',
  path: '/',
  handler: (req, reply) => {
    dbConnection.query('SELECT posts.post_id AS id, posts.title AS title, posts.body AS body, users.github_username AS username FROM posts INNER JOIN users ON posts.user_id = users.user_id ORDER BY id DESC', (err, res) => {
      if (err) return err;
      console.log(res.rows);
      reply.view('index', {
        credentials: req.auth.credentials,
        posts: res.rows,
      });
    });
  },
};


const createPost = {
  method: 'GET',
  path: '/create-post',
  handler: (req, reply) => {
    if (req.auth.isAuthenticated) {
      reply.view('create-post', {
        credentials: req.auth.credentials,
      });
    } else {
      reply.redirect('/login');
    }
  },
};

const postBlog = {
  method: 'POST',
  path: '/post-blog',
  handler: addPost,
};

const logout = {
  method: 'GET',
  path: '/logout',
  handler: (req, reply) => {
    req.cookieAuth.clear();
    reply.redirect('/');
  },
};

const assets = {
  method: 'GET',
  path: '/{file*}',
  handler: {
    directory: {
      path: 'public',
    },
  },
};


module.exports = [
  home,
  createPost,
  logout,
  postBlog,
  login,
  welcome,
  assets,
];
