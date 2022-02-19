const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

const itemCtrl = require('../controllers/item');


// routers : /api/stuff ( see app.use Routes on app.js)

//post : add new item
router.post('/', auth, multer, itemCtrl.createItem);

// get one item by given id
router.get('/:id', auth, itemCtrl.getItem);

//udate ine item by given id
router.put('/:id', auth, itemCtrl.updateItem);

//git all items
router.get('/', auth, itemCtrl.getItems);

//delete : delete one item

router.delete('/:id', auth, itemCtrl.deleteItem);


module.exports = router;
