const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
const Item     = require('./models/Item');

mongoose.connect('mongodb+srv://hello:world@cluster0.x3iff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// cors config
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());





// routers

//post : add new item
app.post('/api/stuff',(req,res,next)=>
{
  delete req.body._id; // not necessary because this is generated on backEnd

  const item = Item({
    ...req.body,
    /*
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    */
     // shortcut

  });
  item.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .then(console.log('201'))
      .catch(error => res.status(400).json({ error })
      .catch(400));
});

// get one item by given id
app.get('/api/stuff/:id', (req, res, next) => {

  Item.findOne({ _id: req.params.id })
      .then(item => res.status(200).json(item))
      .then(console.log('200'))
      .catch(error => res.status(400).json({ error })
      .catch(400));
});

//udate ine item by given id
app.put('/api/stuff/:id',(req, res, next)=>{
  Item.updateOne( {_id: req.params.id}, {...req.body, _id: req.params.id})
      .then(()=>res.status(200).json({message:'object modified'}))
      .catch(error => res.status(400).json(error));

});

//git all items
app.get('/api/stuff', (req, res, next) => {

  Item.find()
      .then((items) => res.status(200).json(items))
      .then(console.log('200'))
      .catch(error => res.status(400).json({ error })
      .catch(400));
});


module.exports = app;
