
const Item = require('../models/Item');

//post : add new item

exports.createItem = (req, res, next) => {
  const itemObject = JSON.parse(req.body.thing);
  delete itemObject._id;
  const item = new Item({
    ...itemObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  item.save()
    .then(() => res.status(201).json({ message: 'Objet enregistrĂ© !'}))
    .catch(error => res.status(400).json({ error }));
};

/*
exports.createItem = ('/',(req,res,next)=>
{
  const itemObject = JSON.parse(req.body.item);


  delete itemObject._id; // because this _id is generated on backEnd

   const item = Item({
    ...itemObject,
    imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    /*
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    */
     // shortcut
/*
  });
  item.save()
      .then(() => res.status(201).json({ message: 'Objet enregistrĂ© !'}))
      .then(console.log('201'))
      .catch(error => res.status(400).json({ error })
      .catch(400));
});
*/
// get one item by given id
exports.getItem =('/:id', (req, res, next) => {

  Item.findOne({ _id: req.params.id })
      .then(item => res.status(200).json(item))
      .then(console.log('200'))
      .catch(error => res.status(400).json({ error })
      .catch(400));
});



//udate ine item by given id
exports.updateItem =('/:id',(req, res, next)=>{
  Item.updateOne( {_id: req.params.id}, {...req.body, _id: req.params.id})
      .then(()=>res.status(200).json({message:'object modified'}))
      .catch(error => res.status(400).json({error}));

});

//git all items
exports.getItems =('/', (req, res, next) => {

  Item.find()
      .then((items) => res.status(200).json(items))
      .then(console.log('200'))
      .catch(error => res.status(400).json({ error })
      .catch(400));
});

// delete one item by given id
/*
exports.deleteItem = (req, res, next) => {
  Item.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
*/
exports.deleteItem = (req, res, next) => {
  Item.findOne({ _id: req.params.id }).then(
    (item) => {
      if (!item) {
        res.status(404).json({
          error: new Error('No such Thing!')
        });
      }
      if (item.userId !== req.auth.userId) {
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }
      Item.deleteOne({ _id: req.params.id }).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }
  )
};
