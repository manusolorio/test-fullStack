const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product.js');

const app = express();
const ctrlProduct = require('./controllers/product.js');

mongoose.connect('mongodb+srv://manuSolorio:kwW94afRLoNoUU3M@cluster0.zlwi9.mongodb.net/<dbname>?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connect to Mongo');
    })
    .catch((error) => {
        console.log('Unable to connect to mongo');
        console.log(error);
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Wuth, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(bodyParser.json());

app.post('/api/products', ctrlProduct.createProduct);
app.get('/api/products/:id', ctrlProduct.getProduct);
app.put('/api/products/:id', ctrlProduct.updateProduct);
app.delete('/api/products/:id', ctrlProduct.deleteProduct);
app.use('/api/products', ctrlProduct.getAllProducts);

module.exports = app;