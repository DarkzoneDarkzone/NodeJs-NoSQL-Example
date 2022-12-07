const express = require('express');
const app = express();
const mongoose = require('mongoose')
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/node-api-test', { useNewUrlParser: true })

const Product = require('./models/product');

// mock data
const products = [{}];

app.get('/', (req, res) => {
  res.json({ message: 'Ahoy!' });
});

app.post('/products', async(req, res) => {
    const payload = req.body;
    const product = new Product(payload);
    await product.save();
    res.status(201).json(product);
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB error', err);
});

app.listen(9000, () => {
  console.log('Application is running on port 9000');
});