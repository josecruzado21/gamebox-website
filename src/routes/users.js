const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/perfil', authMiddleware, usersController.profile);
router.post('/login',  usersController.loginProcess);


module.exports = router;