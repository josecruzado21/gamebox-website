const express = require('express');
const cartController = require('../controllers/cartController');
const mainController = require('../controllers/mainController');
const usersController = require('../controllers/usersController');
const User = require('../models/User');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
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
/*
const upload=multer({storage:storage,fileFilter:function(req,file,cb){
    if (User.findAll({email:req.body.email})){
        cb(null,false)
    }
}})
*/
let upload = multer({ storage });

router.get('/', mainController.home);
router.get('/carrito-de-compras', authMiddleware,cartController.cart);
router.get('/login', guestMiddleware, usersController.login);
router.get('/registro', guestMiddleware, usersController.register);
router.post('/login',  usersController.loginProcess);
router.post('/registro', upload.single('image'),usersController.register_new_user);
router.get('/logout', usersController.logout);

module.exports = router; 