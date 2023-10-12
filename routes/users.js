const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');



// router.get('/users', usersController.user);

// router.get('/profile',passport.checkAuthentication,usersController.user);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);


router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);
console.log('users router is loaded');

router.get('/forgetPassword', usersController.forgetPasswordPage);
router.post('/forgetPasswordLink', usersController.forgetPasswordLink);


router.get('/dashboard',passport.checkAuthentication,usersController.userdashboard);

router.get('/sign-out',usersController.destroySession);

// router.get('/hello',usersController.formshow);
// router.post('/save-form',usersController.saveform);


module.exports = router;