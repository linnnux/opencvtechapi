const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');


// routers : /api/stuff ( see app.use Routes on app.js)

//post : add new item
router.post('/auth', userCtrl.signup);

// get one item by given id
router.post('/login', userCtrl.login);



module.exports = router;
