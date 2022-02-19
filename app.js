const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
const itemRoutes = require('./routes/item.js');
const userRoutes = require('./routes/user.js');
const path = require('path');

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

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff',itemRoutes);

app.use('/api/auth',userRoutes);


module.exports = app;
