const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const bcrypt = require('bcrypt');

// passport.use(
//     new LocalStrategy(
//       {
//         usernameField: 'email'
//       },
//       async function(email, password, done) {
//         try {
//           const user = await User.findOne({ email: email });
  
//           if (!user || user.password !== password) {
//             console.log('Invalid Username/Password');
//             return done(null, false);
//           }
  
//           return done(null, user);
//         } catch (err) {
//           console.log('Error in finding user --> Passport');
//           return done(err);
//         }
//       }
//     )
//   );
  
// //Serializing the user to decide which key is to be kept in the cookies
// passport.serializeUser(function(user, done){
//     done(null,user.id);
// })
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email: email });

        if (!user) {
          console.log('Invalid Username');
          return done(null, false);
        }

        // Compare the provided plain-text password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          console.log('Invalid Password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log('Error in finding user --> Passport');
        return done(err);
      }
    }
  )
);

// Serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});



//deserializing the user from the key in the cookies
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         if(err){
//             console.log('error in finding the user ---> passport');
//             return done(err);
//         }
//         return done(null ,user);
//     })
// })
passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id).exec();
  
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
  
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> Passport');
      return done(err);
    }
  });
  

// //to verify the user is authenticated 
// passport.checkAuthenticaiton = function(req, res ,next){
//     //if the user is signed in , the pass on  the request to the next function (controller's action)
//         if(req.isAuthenticated()){
//             return next();
//         }

//         //if the user is not signed in
//         return res.redirect('/users/sign-in');
// }


// passport.setAuthenticatedUser = function(req, res, next){
//     if(req.isAuthenticated()){
//         //res.user contains the current signed in user from the session cookie and we are just sending this to the views
//         res.locals.user = req.user;
//     }
//     next();
// }
//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in , the pass on the request to the next function(Controlloer action)

    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sendding to the lovals views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;