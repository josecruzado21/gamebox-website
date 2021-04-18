
const path = require('path');
const fs = require('fs');
const db = require('../database/models');

const { QueryTypes } = require('sequelize');


const ShoppingCart = db.ShoppingCart;
const ShoppingCartProduct = db.ShoppingCartProduct;
const Product = db.Product;
const User = db.User;

let cartApiController = {

    createCart:(req,res) => {
        console.log("body crear carrito")
        console.log(req.body)
        ShoppingCart.create({        
            user:req.body.userId,
            itemsQuantity:req.body.itemsQuantity,
            totalPrice:req.body.totalPrice,
            shoppingCartStatus : req.body.shoppingCartStatus,
            date:Date.now()
     }).then((data)=> {
             console.log("Carro creado por api")
             res.json(data)
         })            
         .catch(error => res.send(error))
    },

    updateCart:(req,res) => {
        console.log("body actualizar carrito")
        console.log(req.body)
        ShoppingCart.update({        
            itemsQuantity:req.body.itemsQuantity,
            totalPrice:req.body.totalPrice,
            shoppingCartStatus : req.body.shoppingCartStatus,
     },
     {
        where:{id:req.body.id}
     }
     ).then((data)=> {
             console.log("Carro actualizado por api")
             res.json(data)
         }
)            
         .catch(error => res.send(error))
    },


    createCartProduct:(req,res) => {
        console.log("body crear producto-carrito")
        console.log(req.body)

        ShoppingCartProduct.create({        
            product:req.body.product,
            shoppingCart:req.body.shoppingCart,
            hasEdition:req.body.hasEdition,
            edition:req.body.edition,
            price : req.body.price,
            quantity:req.body.quantity,
            image:req.body.image,
     }).then((data)=> {
             console.log("createCartProduct creado por api")
             res.json(data)
         })            
         .catch(error => res.send(error))
    },

    updateCartProduct:(req,res) => {
        console.log("body actualizar producto-carrito")
        console.log(req.body)

        ShoppingCartProduct.update({        
            quantity:req.body.quantity
        },
     {
         where:{id:req.body.id}
     }).then((data)=> {
             console.log("createCartProduct actualizado por api")
             res.json(data)
         })            
         .catch(error => res.send(error))
    },


    getCart:(req,res) => {
      
        let userId = req.query.userId;
        let status = req.query.status;
        console.log(userId);
  
        ShoppingCart.findOne({
          include: [
              {
              model:User,
              as : 'userShoppingCart',
            //   where:{
            //       slug:childCategory
            //   }
          },
            {
                model:ShoppingCartProduct,
                as : 'shoppingCartShoppingCartProducts',
            } ],
          where: {
              [db.Sequelize.Op.and]  : [{user: userId}, {shoppingCartStatus:status} ]
          },
        })
          .then(product => {
  
            res.json(product)
          })   .catch(error => {
            console.log(error)
            res.send(error)
          }  )
    },


}

module.exports = cartApiController;