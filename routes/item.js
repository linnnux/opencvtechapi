const express = require('express');

const router = express.Router();

const itemCtrl = require('../controllers/item');


// routers : /api/stuff ( see app.use Routes on app.js)

//post : add new item
router.post('/', itemCtrl.createItem);

// get one item by given id
router.get('/:id', itemCtrl.getItem);

//udate ine item by given id
router.put('/:id', itemCtrl.updateItem);

//git all items
router.get('/', itemCtrl.getItems);

//delete : delete one item
router.post('/', itemCtrl.deleteItem);


module.exports = router;
