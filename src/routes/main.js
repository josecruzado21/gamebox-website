const express = require('express');
const cartController = require('../controllers/cartController');
const mainController = require('../controllers/mainController');
const usersController = require('../controllers/usersController');
const User = require('../models/User');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const path=require('path');
const multer=require('multer');
const {check} = require('express-validator');


//Validaciones
const validacionesRegister = [
    check('name')
    .notEmpty().withMessage('Debe completar el campo nombre!')
    .isLength({min:2}).withMessage('Tu nombre debe tener al menos 2 carácteres').bail(),
        
   
    check('lastName').notEmpty().withMessage('Debes completar el campo apellido!'),
   
        check('email')
        .isEmail().withMessage('El email no es válido').bail()
    .notEmpty().withMessage('Debes completar el campo email!'),
   
   
    check('password')
    .isLength({min:8}).withMessage('Tu contraseña debe tener al menos 8 carácteres').bail()
        .notEmpty().withMessage('Debes completar el campo contraseña!'),

    check('image').custom((value, {req}) => {
        let file = req.file;
        if(!file){
            throw new Error('Debes subir la imagen')
        }
        return true;
    })
]

const validacionesLogin = [

   
    check('email')
        .isEmail().withMessage('El email no es válido').bail()
        .notEmpty().withMessage('Debes completar el campo email!'),
   
   
    check('password').notEmpty().withMessage('Debes completar el campo contraseña!'),


]

const router = express.Router();

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname,'../../public/images/avatars'))
    },
    filename: (req,file,cb)=>{
        const newFilename = Date.now()+path.extname(file.originalname);
        cb(null, newFilename);
    }
});

// const upload=multer({storage:storage,fileFilter:function(req,file,cb){
//     if (User.findByProperty('email',req.body.email)){
//         cb(null,false)
//     }
// }})



let upload = multer({ storage });

router.get('/', mainController.home);
router.get('/carrito-de-compras', authMiddleware,cartController.cart);
router.post('/carrito-de-compras/:id', authMiddleware,cartController.update);
router.get('/thanks', authMiddleware, cartController.thanksPurchase);
router.get('/login', guestMiddleware, usersController.login);
router.get('/registro', guestMiddleware, usersController.register);
router.post('/login', validacionesLogin,  usersController.loginProcess);
router.post('/registro',  [upload.single('image'), validacionesRegister], usersController.register_new_user);
router.get('/logout', usersController.logout);

module.exports = router; 