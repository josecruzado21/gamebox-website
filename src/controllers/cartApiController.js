
const path = require('path');
const fs = require('fs');
const db = require('../database/models');

const { QueryTypes, Sequelize } = require('sequelize');


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
            category:req.body.category
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

    getShoppingCarts:(req,res) => {
      
        let status = req.query.status;
      
        ShoppingCart.findAll({
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
              [db.Sequelize.Op.and]  : [ {shoppingCartStatus:status} ]
          },
        })
          .then(product => {
  
            res.json(product)
          })   .catch(error => {
            console.log(error)
            res.send(error)
          }  )
    },

    getShoppingCartsProductsQuantity:(req,res) => {
      
        let status = req.query.status;
        let limit = req.query.limit;

        if(limit == undefined || limit == null){
            limit = 1000;
        }

        limit = Number(limit)

        db.sequelize.query(

            'SELECT sum(sp.quantity) as total, p.name, p.id, p.price, p.image1, c.name as category, pc.name as parentCategory FROM gamebox.shoppingcartproducts sp '+
            'inner join products p on p.id = sp.product ' +
            'inner join shoppingcart s on s.id = sp.shoppingCart and s.shoppingCartStatus = :shoppingCartStatus '+
            'inner join categories c on c.id = p.category '+
            'inner join categories pc on c.parent_id = pc.id '+
            'group by product ' +
            'order by total desc ' +
            'limit :limit',
         {
           type: QueryTypes.SELECT,
           nest: true,
           replacements: { shoppingCartStatus: status, limit: limit },
         }).then(resp => { 
              res.json(resp)
         }).catch(error => {  
             console.log(error.message);
             res.send(error)
           })

        },


    getLastBuyedProducts:(req,res) => {
      
        let limit = req.query.limit;
        

        if(limit == undefined || limit == null){
            limit = 1000;
        }

        limit = Number(limit)

        db.sequelize.query(

            'SELECT p.name, p.id, p.price, p.image1, c.name as category, pc.name as parentCategory FROM gamebox.shoppingcartproducts sp '+
            'inner join products p on p.id = sp.product ' +
            'inner join shoppingcart s on s.id = sp.shoppingCart and s.shoppingCartStatus = 3 '+
            'inner join categories c on c.id = p.category '+
            'inner join categories pc on c.parent_id = pc.id '+
            'order by s.date desc ' +
            'limit :limit',
         {
           type: QueryTypes.SELECT,
           nest: true,
           replacements: { limit: limit },
         }).then(resp => { 
              res.json(resp)
         }).catch(error => {  
             console.log(error.message);
             res.send(error)
           })

        },
   




}

module.exports = cartApiController;