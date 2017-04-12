BEGIN;

DROP TABLE IF EXISTS users, posts;

CREATE TABLE users (
  user_id         SERIAL          PRIMARY KEY,
  github_username VARCHAR(100)    NOT NULL,
  avatar_url      VARCHAR(300)    NOT NULL,
  github_id       INTEGER         NOT NULL,
  access_token    VARCHAR(500)    NOT NULL
);

CREATE TABLE posts (
  post_id         SERIAL          PRIMARY KEY,
  title           VARCHAR(50)     NOT NULL,
  body            VARCHAR(5000)   NOT NULL,
  user_id         INTEGER         REFERENCES users(user_id)
);

INSERT INTO users(github_username, avatar_url, github_id, access_token) VALUES
('MrCat', 'http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg', 1234, 'canHazAccess'),
('MsPuppy', 'http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg', 5678, 'gimmeDaAccess');


INSERT INTO posts(title, body, user_id) VALUES
('Lorem1', '111-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?', 1),
('Lorem2', '222-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?', 2);

COMMIT;
