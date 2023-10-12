const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
// const empController = require('../controllers/employee_controller');



router.get('/', homeController.home);
router.get('/single-page/:id',homeController.singlepage);
// router.use('/users',require('./users'));
// router.get('/emp', empController.employee);

router.use('/users', require('./users'));
router.use('/admin', require('./admin'));


console.log('Index router loaded');




module.exports = router;