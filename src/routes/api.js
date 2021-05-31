const express = require('express');
const productsApiController = require('../controllers/productsApiController');
const usersApiController = require('../controllers/usersApiController');
const cartApiController = require('../controllers/cartApiController');
const router = express.Router();

router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });


router.get('/categorias/:parentCategory?', productsApiController.getCategories)
router.get('/productos/:parentCategory/:childCategory/:slugProduct', productsApiController.getProductBySlugs)
router.get('/products', productsApiController.getProducts)
router.get('/products/:id', productsApiController.getProductById)
router.get('/categories', productsApiController.getAllCategories)
router.get('/totals', productsApiController.getTotals)
router.get('/carrito-compras/', cartApiController.getCart)
router.post('/carrito-compras/', cartApiController.createCart)
router.put('/carrito-compras/', cartApiController.updateCart)
router.post('/carrito-compras-producto/', cartApiController.createCartProduct)
router.put('/carrito-compras-producto/', cartApiController.updateCartProduct)
router.get('/shopping-cart/', cartApiController.getShoppingCarts)
router.get('/shopping-cart/lastBuyed', cartApiController.getLastBuyedProducts)
router.get('/shopping-cart/productsQuantity', cartApiController.getShoppingCartsProductsQuantity)
router.get('/shopping-cart/', cartApiController.getShoppingCarts)



router.get('/users', usersApiController.getUsers)
router.get('/users/:id', usersApiController.getUserDetail)

module.exports = router;