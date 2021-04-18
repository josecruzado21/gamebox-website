  
const path = require('path');
const db = require('../database/models');

const { QueryTypes } = require('sequelize');
const ShoppingCart = db.ShoppingCart;
const ShoppingCartProduct = db.ShoppingCartProduct;
const Product = db.Product;
const User = db.User;


const cartController = {
    cart: (req, res) => {

        let title = 'Carrito de Compras';
        let user = req.session.userLogged;
        let productList = [];

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
                [db.Sequelize.Op.and]  : [{user: user.id}, {shoppingCartStatus:1} ]
            },
          }).then(data => {

            if(data){
                let productsFound =  data.shoppingCartShoppingCartProducts;
                console.log("Productos Encontrados: " +  JSON.stringify(productsFound) )
                productList = productsFound

                res.render('pages/productCart', {
                    'title': title,
                    productList,
                    total:data?.totalPrice,
                    tax:data?.totalPrice*0.19,
                    totalBeforeTax:data?.totalPrice -(data?.totalPrice*0.19)
                });
            }else{


                res.render('pages/productCart', {
                    'title': title,
                    productList,   
                    total:0,
                    tax:0,
                    totalBeforeTax:0
                });
            }

            })
            .catch(error => {
              console.log(error)
              res.send(error)
            })



    }
};

module.exports = cartController;