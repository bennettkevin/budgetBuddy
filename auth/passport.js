require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userModel = require('../models/userModel');

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: '/api/auth/google/callback'
}, async (token, tokenSecret, profile, done) => {

  const newUser = {
    googleId: profile.id,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    email: profile.emails[0].value
  }
  const user = await userModel.getUserById(profile.id);
  // If user doesn't exist, create a new user.
  if (!user) {
    userModel.createNewUser(Object.values(newUser));
  }
  return done(null, profile);
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.getUserById(id); 
    done(null, user); 
  } catch (error) {
    done(error);
  }
});