  
const path = require('path');
const db = require('../database/models');

const { QueryTypes } = require('sequelize');
const ShoppingCart = db.ShoppingCart;
const ShoppingCartProduct = db.ShoppingCartProduct;
const Product = db.Product;
const User = db.User;
const Category = db.Category;
const title = 'Carrito de Compras';

const cartController = {
    cart: (req, res) => {

       
        let user = req.session.userLogged;
        let productList = [];

        ShoppingCart.findOne({
            include: [
                {
                    model:User,
                    as : 'userShoppingCart',
                },
                {
                  model:ShoppingCartProduct,
                  as : 'shoppingCartShoppingCartProducts',
                  include:[
                      {
                          model:Category,
                          as:'categories'
                      },
                      {
                            model:Product,
                            as:'productShoppingCartProducts'
                      }
                  ]
                }
            ],
            where: {
                [db.Sequelize.Op.and]  : [{user: user.id}, {shoppingCartStatus:1} ]
            },
          }).then(data => {

      
            if(data){
                let productsFound =  data.shoppingCartShoppingCartProducts;
                console.log("Productos Encontrados: " +  JSON.stringify(productsFound) )
                productList = productsFound

                res.render('pages/productCart', {
                    title,
                    productList,
                    total:data?.totalPrice,
                    tax:data?.totalPrice*0.19,
                    totalBeforeTax:data?.totalPrice -(data?.totalPrice*0.19),
                    user:req.session.userLogged,
                    cartId:data.id


                });
            }else{


                res.render('pages/productCart', {
                    'title': title,
                    productList,   
                    total:0,
                    tax:0,
                    totalBeforeTax:0,
                    user:req.session.userLogged,
                });
            }

            })
            .catch(error => {
              console.log(error)
              res.send(error)
            })



    },

    update: async (req, res) => {
   
   
        let id = parseInt(req.params.id);
        console.log("actualizando carrito")
        console.log(JSON.stringify(req.body))
     await ShoppingCart.update({
            shoppingCartStatus:  3,
        
        },{
            where:{id:id}
        }).then(a=>
            {
              console.log("Carrito actualizado!")
              res.render('pages/successPurchase', {
                title: title, 
                user:req.session.userLogged
                })
            }
    
            )
    },
};

module.exports = cartController;