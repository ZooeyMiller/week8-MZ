
# week8-MZ 
https://mz-learning-tool.herokuapp.com/

## How to do a run of your app?
* clone this repo
* ```npm i```
* ```npm run devStart```
* (we don't have any tests, we know, bad us)
* We will post the usernames and passwords in gitter (security n that)


## Database schema:

### Users: 1 to 1
Column | Type | Modifiers
--- | --- | ---
user_id | integer | not null default
github_username | character varying(100) | not null
avatar_url | character varying(300) | not null
github_id | integer | not null unique
access_token | character varying(500) | not null 

### Posts: 1 to Many

Column | Type | Modifiers
--- | --- | ---
post_id | integer | not null default
title | character varying(50) | not null
body | character varying(500) | not null
user_id | integer | not null

## What?
A basic CMS blog platform with authentication, session management and templating with handlebars.

## Why?
**As a** member of Founders and Coders, who wants to learn from my fellow devs
> **I want to** log in with my Github account  
> **So that** I can use my Github organisation's info to see posts from my fellow students.

Acceptance criteria:

+ [ ] I can click on a button, which allows me to log in via my Github account
+ [ ] The look of the button should make it obvious that it is this form of login
+ [ ] Once I'm logged in, I should see a list of blog posts
+ [ ] I shouldn't be left with a blank loading screen for too long during the authorisation process, otherwise I will lose confidence in your website and leave.

**As** any user who is logged in
> **I want to** see my username & Github profile picture on the homepage  
> **So that** I benefit from logging in with Github OAuth, and don't have to do any profile setup on your site.

Acceptance criteria:

+ [ ] I can see my username & profile picture on each page that I visit


## How?
- hapi for server creation and general back end stuff
- PSQL hosted on heroku for the database
- handlebars for templating
- OAuth for logging in 

## What did u learn tho?

