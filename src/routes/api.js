const express = require('express');
const productsApiController = require('../controllers/productsApiController');
const router = express.Router();

router.get('/categorias/:parentCategory?', productsApiController.getCategories)
router.get('/productos/:parentCategory/:childCategory/:slugProduct', productsApiController.getProduct)

module.exports = router;