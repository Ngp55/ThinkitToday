const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController = require('../controllers/admin_controller');
//const addPostsController = require('../controllers/admin_addPost');
//const postListsController = require('../controllers/admin_postList');


 //router.get('/userlist',passport.checkAuthentication,usersController.user);

router.get('/dashboard',passport.checkAuthentication,adminController.dashboard);

router.get('/addpost',passport.checkAuthentication,adminController.addPost);


router.get('/postlist',passport.checkAuthentication,adminController.articleList);

router.get('/display-none',passport.checkAuthentication,adminController.artDisable);

router.get('/display',passport.checkAuthentication,adminController.artEnable);

router.post('/save-article',passport.checkAuthentication,adminController.createArticle);




module.exports = router;
