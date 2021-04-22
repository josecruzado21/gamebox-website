
const path = require('path');
const fs = require('fs');
const db = require('../database/models');

const { QueryTypes } = require('sequelize');


const productsPath = path.resolve(__dirname, '../data/products.json');
const Category = db.Category;
const Product = db.Product;

let productsApiController = {
  
    getCategories:(req,res) => {
        let parentCategory = req.params.parentCategory;
        let childCategory = req.params.childCategory;

        //Busca todas
        if(parentCategory == null || parentCategory == undefined ){

            db.sequelize.query(
            'select c1.id'+
            ', c1.name'+
            ', (select name from categories where c1.parent_id = categories.id) as ParentName'+
            ' from categories c1'
           , {
               type: QueryTypes.SELECT,
               nest: true,
             }).then(categories => {  
                 res.json(categories)
             }).catch(error => {  
                 console.log(error.message);
                 res.json("Error")
               })
    }
      //Busca por categorias por padres
     else
      {
        db.sequelize.query(
            'select c1.id'+
            ', c1.name'+
            ', (select name from categories where c1.parent_id = categories.id) as ParentName'+
            ' from categories c1'+
            ' where (select name from categories where c1.parent_id = categories.id) = :parentCategory'
           , {
               type: QueryTypes.SELECT,
               nest: true,
               replacements: { parentCategory: parentCategory },
             }).then(categories => {  
                 res.json(categories)
             }).catch(error => {  
                 console.log(error.message);
                 res.json("Error")
               })
      }


       //Busca por categorias por hijos
       if(childCategory != null && childCategory != undefined ){

       }
    
   
    },

    getProduct:(req,res) => {

      let childCategory = req.params.childCategory;
      let slugProduct = req.params.slugProduct;

      Product.findOne({
        include: [{
            model:Category,
            as : 'categories',
            where:{
                slug:childCategory
            }
        } ],
        where: {
            [db.Sequelize.Op.and]  : [{slug: slugProduct} ]
        },
    })
        .then(product => {

          res.json(product)
        })

    }
}

module.exports = productsApiController;