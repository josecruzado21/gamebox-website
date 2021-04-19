const express = require('express');
const productsApiController = require('../controllers/productsApiController');
const cartApiController = require('../controllers/cartApiController');
const router = express.Router();

router.get('/categorias/:parentCategory?', productsApiController.getCategories)
router.get('/productos/:parentCategory/:childCategory/:slugProduct', productsApiController.getProduct)
router.get('/carrito-compras/', cartApiController.getCart)
router.post('/carrito-compras/', cartApiController.createCart)
router.put('/carrito-compras/', cartApiController.updateCart)
router.post('/carrito-compras-producto/', cartApiController.createCartProduct)
router.put('/carrito-compras-producto/', cartApiController.updateCartProduct)

module.exports = router;