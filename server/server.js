'use strict'
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const config = require('./config.js');
const bodyParser = require('body-parser');
const app = express();

//----------------------------------------------------------------------------------
// Auth Strategy
//----------------------------------------------------------------------------------
passport.use(new GitHubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback'
},
  (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
          return done(null, profile);
      });
  }
));

//----------------------------------------------------------------------------------
// CREATE SESSIONS
//----------------------------------------------------------------------------------

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

//----------------------------------------------------------------------------------
// MIDDLEWARE
//----------------------------------------------------------------------------------
app.use(session({ secret: config.session_secret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

//----------------------------------------------------------------------------------
// ENDPOINTS
//----------------------------------------------------------------------------------
app.get('/auth/github', 
passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
      console.log(req.user);
      res.redirect('/#/home');
  });

app.listen(3000, () => console.log('listening on port ' + 3000))

