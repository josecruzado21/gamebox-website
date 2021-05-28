
const path = require('path');
const fs = require('fs');
const db = require('../database/models');
var _ = require('lodash');
const { QueryTypes, Sequelize } = require('sequelize');


const productsPath = path.resolve(__dirname, '../data/products.json');
const Category = db.Category;
const Product = db.Product;
const RawInfo = db.RawInfo;

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

    getProductBySlugs:(req,res) => {

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

    },

    getProducts:(req,res) => {
        let respProducts = [];
        let resp = {}
        let cats = []
        let page = req.query.page;
        let offset = 0;

        if(page == null || page ==undefined){
            page = 1
        }else if(page > 1){
            offset = (page - 1 )*10;
        }

        Product.findAll({ limit : 10, offset:offset,  
            attributes: ["categories"],
            attributes: { 
                include: [[Sequelize.fn("COUNT", Sequelize.col("categories.parentCategory.id")), "countCategories"]] ,
                exclude:["id","name","slug","description","price","image1","image2", "category", "hasEdition", "edition", "stock", "isNew", "rawInfo"]
              
            },
            include:[{
                model:Category,
                as : 'categories',
                include: [    
                    { 
                    model:Category,
                    as : 'parentCategory'
                    }       
                ],
            }],
            group: ['categories.parentCategory.id']
        }).then(categories =>{
         
            let catgs = JSON.parse(JSON.stringify(categories));

            catgs.forEach(catg => {
               let c = {}
               c.name = catg.categories.parentCategory.name 
               c.count = catg.countCategories 
               cats.push(c)
              
            });

            Product.findAll({ limit : 10, offset:offset,            
      
                include:[{
                    model:Category,
                    as : 'categories',
                    include: [    
                        { 
                        model:Category,
                        as : 'parentCategory'
                        }       
                    ]
                },
                {
                    model:RawInfo,
                    as : 'rawInfoObj',
                }],
                order: [
                    ['id', 'DESC']
                   
                ],
            })
            .then(products => {

                let prds = JSON.parse(JSON.stringify(products));

                for(i in prds) {
                    prds[i].detail =  req.protocol + '://' + req.get('host') + "/api/products/"+prds[i].id
                 
                    prds[i].img1 = req.protocol + '://' + req.get('host') +"/images/products/"+prds[i].image1
                    prds[i].img2 = req.protocol + '://' + req.get('host') +"/images/products/"+prds[i].image2

                  }
                  
                resp = {"count": products.length, productos:prds, countByCategory:cats }           

                res.json(resp)
            })

        });



  
      },

      getProductById:(req, res) => {
       
        Product.findByPk(req.params.id, {
            include:[{
                model:Category,
                as : 'categories',
                include: [    
                    { 
                    model:Category,
                    as : 'parentCategory'
                    }       
                ]
            },
            {
                model:RawInfo,
                as : 'rawInfoObj',
            }]
        })
        .then(prd => {  

            let resp = JSON.parse(JSON.stringify(prd));


            resp.img1 = req.protocol + '://' + req.get('host') +"/images/products/"+resp.image1
            resp.img2 = req.protocol + '://' + req.get('host') +"/images/products/"+resp.image2

            res.json(resp)
        }).catch(error => {  
            console.log(error.message);
            let resp = {
                error: "Error obteniendo los usuarios"
            }
            res.json(resp);
          })
    },

    // getAllCategories:(req,res) => {

    //     Category.findAll({
    //         include: [    
    //             { 
    //             model:Category,
    //             as : 'parentCategory'
    //             }       
    //         ]
   
    //   })
    //       .then(categories => {
  
    //         res.json(categories)
    //       })
  
    //   },


      getAllCategories:(req,res) => {

        Category.findAll({
            include: [    
                { 
                model:Category,
                as : 'parentCategory'
                }, 
                {
                    model:Product,
                    as : 'products'
                }       
            ]
   
      }).then(categories => {
            
            let childCategories  = (categories.filter(cat => cat.parent_id != null));
           // console.log(childCategories);
            let grouped = Object.values(_.groupBy(childCategories, cat => cat.parent_id))
            let resp = []
            grouped.forEach(group => {
                let cat = {}
                cat.name = group[0].parentCategory.name
                let childs = []
                let countParent = 0;
                group.forEach(catg => {
                    let c = {}
                    c.name = catg.name;
                    c.id = catg.id;
                    c.products = catg.products.length
                    countParent += catg.products.length
                    childs.push(c)
                });
                cat.products = countParent
                cat.childs = childs;
                resp.push(cat);  
            });

         //   console.log("res");
        //    console.log(resp);

            //console.log(grouped);

            res.json(resp);
          })
  
      },

}


module.exports = productsApiController;