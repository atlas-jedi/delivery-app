const ordersService = require('../database/controllers/orders.controller');

const express = require('express');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());
app.get('/customers/orders/:id', ordersService.getOrdersByUserId);

module.exports = app;
