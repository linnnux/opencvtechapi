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



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

// routers

//post
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


app.get('/api/stuff', (req, res, next) => {

  Item.find()
      .then((items) => res.status(200).json(items))
      .then(console.log('200'))
      .catch(error => res.status(400).json({ error })
      .catch(400));
/*
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
  */
});
module.exports = app;
