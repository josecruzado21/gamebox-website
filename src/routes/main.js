const express = require('express');
const cartController = require('../controllers/cartController');
const mainController = require('../controllers/mainController');
const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const path=require('path')
const multer=require('multer')

const router = express.Router();

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname,'../../public/images/avatars'))
    },
    filename: (req,file,cb)=>{
        const file_name=Date.now()+path.extname(file.originalname)
        cb(null,file_name)
    }
});

const upload=multer({storage})

router.get('/', mainController.home);
router.get('/carrito-de-compras', cartController.cart);
router.get('/login', guestMiddleware, usersController.login);
router.get('/registro', guestMiddleware, usersController.register);
router.post('/login',  usersController.loginProcess);
router.post('/registro', upload.single('image'),usersController.register_new_user);

module.exports = router; 