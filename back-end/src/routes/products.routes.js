const express = require('express');
const productsController = require('../controllers/ProductsController');

const productRoutes = express.Router();

productRoutes.get('/', productsController.getAllProducts);
productRoutes.get('/:id', productsController.getProductById);

module.exports = productRoutes;
