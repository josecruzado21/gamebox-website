const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const productsController = require('../controllers/productsController');
const {check} = require('express-validator');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        const newFilename = file.originalname;
        cb(null, newFilename);
    }
});

let upload = multer({ storage });


//Validaciones
const validacionesSaveUpdate = [
    check('name')
    .isLength({min:5}).withMessage('El nombre de producto debe tener al menos 5 carácteres').bail()
    .notEmpty().withMessage('Debes completar el campo nombre de producto!'),
  
        
    check('description')
    .isLength({min:20}).withMessage('La descripcion debe tener al menos 8 carácteres')
    .notEmpty().withMessage('Debes completar el campo descripción!').bail(),

   
    check('mainImage').custom((value, {req}) => {
        let files = req.files;
      //  console.log(files);
        let mainImage = files.find((f) => f.fieldname == "mainImage");
     //   console.log(mainImage);
        let secondImage = files.find((f) => f.fieldname == "secondImage");
      //  console.log(secondImage);
        if(!mainImage){
            throw new Error('Debes subir la imagen')
        }
        return true;
    }),

    check('secondImage').custom((value, {req}) => {
        let files = req.files;
    //    console.log(files);
        let mainImage = files.find((f) => f.fieldname == "mainImage");
  //      console.log(mainImage);
        let secondImage = files.find((f) => f.fieldname == "secondImage");
    //    console.log(secondImage);
        if(!secondImage){
            throw new Error('Debes subir la imagen secundaria')
        }
        return true;
    })
]

router.get('/', productsController.list)
router.get('/:parentCategory', productsController.list)
router.get('/:parentCategory/:childCategory', productsController.list)
router.get('/:parentCategory/:childCategory/:slugProduct', productsController.product);
router.get('/especiales/clientes/promocion/:ofertas',productsController.ofertas)

router.post('/crear' ,[upload.any(), validacionesSaveUpdate],productsController.save);
router.put('/editar/:id',  [upload.any(), validacionesSaveUpdate],productsController.update);
router.delete('/eliminar/:id',productsController.delete);

router.put('/editar-info/:id', productsController.updateInfoRaw);

module.exports = router;