const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const usersController = require('../controllers/usersController');

router.get('/productos/crear', productsController.create);
router.get('/productos/editar/:id', productsController.edit);
router.get('/productos/editar-info/:id', productsController.editInfo);

router.get('/usuarios/editar/:id', usersController.edit);
router.get('/usuarios', usersController.list);

module.exports = router;
