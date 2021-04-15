
const path = require('path');
const fs = require('fs');
const db = require('../database/models');

const { QueryTypes } = require('sequelize');
const { log } = require('console');


const productsPath = path.resolve(__dirname, '../data/products.json');
const Category = db.Category;
const Product = db.Product;


function make_slug(str)
{
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9]+/g, '-');
    str = str.replace(/^-+|-+$/g, '');
    return str;
}

let productsController = {
  
    
    
    product: (req, res) => {
        let title = 'Gamebox | ';
        let id = parseInt(req.params.id);

        let parentCategory = req.params.parentCategory;
        let childCategory = req.params.childCategory;
        let slugProduct = req.params.slugProduct;

        let productFound = {};

        db.Product.findOne({
            //include:[{association:'categories'}],
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

                if(product == null || product == undefined ){
                    res.render('pages/products/productNotFound', {
                        'title': 'Sin resultados',
                        'description':'Producto no encontrado'
                    })
                }
                
                if(product.edition){
                    product.edition = product.edition.split(',');
                }

                console.log(product)
                res.render('pages/products/productDetail', {
                    title: title, 
                    product:product,
                  
                    })
            })


        // let products = fs.readFileSync(productsPath, 'utf-8');
        // products = JSON.parse(products);

        // let productFound = products.find( product => product.id === id);


        // if(productFound == null || productFound == undefined ){
        //     res.render('pages/products/productNotFound', {
        //         'title': 'Sin resultados',
        //         'description':'Producto no encontrado'
        //     })
        // }

        // res.render('pages/products/productDetail', {
        //     title: title + productFound.name,
        //     product : productFound
        // })
    },

    list: (req, res) => {
       
        let title = 'Gamebox | Lista de Productos ';
       
        let parentCategory = req.params.parentCategory;
        let childCategory = req.params.childCategory;

        if(parentCategory == null || parentCategory == undefined ){

         db.sequelize.query('SELECT `Product`.`id`,' + 
         '`Product`.`name`,' +  
         '`Product`.`description`,' +  
         '`Product`.`price`, ' +
         '`Product`.`image1`, ' +
         '`Product`.`image2`, ' +
         '`Product`.`category`, ' +
         '`Product`.`hasEdition`, ' +
         '`Product`.`edition`, `Product`.`stock`, `Product`.`isNew`, ' +
         '`Product`.`rawInfo`, ' +
         '`Product`.`slug`, ' +
         '`categories`.`id` AS `categories.id`, ' +
         '`categories`.`name` AS `categories.name`, ' +
         '`categories`.`slug` AS `categories.slug`, ' +
         '(select name from categories as c2 where categories.parent_id = c2.id) as `categories.parent_name`,' +
         '(select slug from categories as c2 where categories.parent_id = c2.id) as `categories.parent_slug`' +
         'FROM `products` AS `Product` ' +
         'LEFT OUTER JOIN `categories` AS `categories` ' +
         'ON `Product`.`category` = `categories`.`id`', {
            type: QueryTypes.SELECT,
            nest: true,
          }).then(prds => {  

              if(prds == null || prds == undefined || prds.length < 1){
                res.render('pages/products/productNotFound', {
                    'title': 'Sin resultados',
                    'description':'Lo sentimos no encontramos productos'
                })
            }

              res.render('pages/products/productList', {
                title: title, 
                products:prds,
              
                })
          }).catch(error => {  
              console.log(error.message);
              res.render('pages/error', {
                title: title
            
              
                })
            })
         
      
        }

        //Busca por categorias principales
        if(parentCategory != null && parentCategory != undefined && (childCategory == null || childCategory == undefined)){

            db.sequelize.query('SELECT `Product`.`id`,' + 
            '`Product`.`name`,' +  
            '`Product`.`description`,' +  
            '`Product`.`price`, ' +
            '`Product`.`image1`, ' +
            '`Product`.`image2`, ' +
            '`Product`.`category`, ' +
            '`Product`.`hasEdition`, ' +
            '`Product`.`edition`, `Product`.`stock`, `Product`.`isNew`, ' +
            '`Product`.`rawInfo`, ' +
            '`Product`.`slug`, ' +
            '`categories`.`id` AS `categories.id`, ' +
            '`categories`.`name` AS `categories.name`, ' +
            '`categories`.`slug` AS `categories.slug`, ' +
            '(select name from categories as c2 where categories.parent_id = c2.id) as `categories.parent_name`,' +
            '(select slug from categories as c2 where categories.parent_id = c2.id) as `categories.parent_slug`' +
            'FROM `products` AS `Product` ' +
            'LEFT OUTER JOIN `categories` AS `categories` ' +
            'ON `Product`.`category` = `categories`.`id`' + 
            'where (select slug from categories as c2 where categories.parent_id = c2.id) = :parentCategory', 
            
            {
               type: QueryTypes.SELECT,
               nest: true,
               replacements: { parentCategory: parentCategory },
             
             }).then(prds => {  
               
                 //console.log(JSON.stringify(prds[0], null, 2));

                 if(prds == null || prds == undefined || prds.length < 1){
                    res.render('pages/products/productNotFound', {
                        'title': 'Sin resultados',
                        'description':'Lo sentimos no encontramos productos'
                    })
                }
                 res.render('pages/products/productList', {
                   title: title, 
                   products:prds,
                 
                   })
             }).catch(error => {  
                console.log(error.message);
                res.render('pages/error', {
                  title: title
              
                
                  })
              });

            
        }

        //Busca por categorias secundarias
        if(childCategory != null && childCategory != undefined ){
            db.sequelize.query('SELECT `Product`.`id`,' + 
            '`Product`.`name`,' +  
            '`Product`.`description`,' +  
            '`Product`.`price`, ' +
            '`Product`.`image1`, ' +
            '`Product`.`image2`, ' +
            '`Product`.`category`, ' +
            '`Product`.`hasEdition`, ' +
            '`Product`.`edition`, `Product`.`stock`, `Product`.`isNew`, ' +
            '`Product`.`rawInfo`, ' +
            '`Product`.`slug`, ' +
            '`categories`.`id` AS `categories.id`, ' +
            '`categories`.`name` AS `categories.name`, ' +
            '`categories`.`slug` AS `categories.slug`, ' +
            '(select name from categories as c2 where categories.parent_id = c2.id) as `categories.parent_name`,' +
            '(select slug from categories as c2 where categories.parent_id = c2.id) as `categories.parent_slug`' +
            'FROM `products` AS `Product` ' +
            'LEFT OUTER JOIN `categories` AS `categories` ' +
            'ON `Product`.`category` = `categories`.`id`' + 
            'where (select slug from categories as c2 where categories.parent_id = c2.id) = :parentCategory' +
            ' and `categories`.`slug` = :childCategory', 
            
            {
               type: QueryTypes.SELECT,
               nest: true,
               replacements: { parentCategory: parentCategory, childCategory: childCategory },
             
             }).then(prds => {  

   
                         if(prds == null || prds == undefined || prds.length < 1){
                            res.render('pages/products/productNotFound', {
                                'title': 'Sin resultados',
                                'description':'Lo sentimos no encontramos productos'
                            })
                        }

                 res.render('pages/products/productList', {
                   title: title, 
                   products:prds,
                 
                   })


             }).catch(error => {  
                console.log(error.message);
                res.render('pages/error', {
                  title: title
              
                
                  })
              });
        }

        // ----------------------------------------------

     

        // let products = fs.readFileSync(productsPath, 'utf-8');
        // products = JSON.parse(products);
       
        // if(products == null || products == undefined || products.length < 1){
        //     res.render('pages/products/productNotFound', {
        //         'title': 'Sin resultados',
        //         'description':'Lo sentimos no encontramos productos'
        //     })
        // }


        // console.log("Params: ")
        // console.log(req.params);

        // let category = req.params.category;

        //     if(category !== null && category !== undefined ){


        //     let productsFound =  products.filter(f => f.category == category);
            
        //     if(productsFound == null || productsFound == undefined || productsFound.length < 1){
        //         res.render('pages/products/productNotFound', {
        //             'title': 'Sin resultados',
        //             'description':'Lo sentimos no encontramos productos para la categoria: ' + category
        //         })
        //         }

                
        //     console.log("Productos encontrados :" );
        //     console.log(productsFound.length);

        //     products = productsFound;
        //     }



        //    products.sort(function(a, b){return b.id - a.id});

        //    res.render('pages/products/productList', {
        //     title: title, 
        //     products:products,
        //     prdTest:prdTest
        //     })
       


    },

    create: (req, res) => {

        let title = 'Gamebox | Crear Producto ';

        let product = null;

        let categories  =  {};

                    //Get Categories
                    db.sequelize.query(
                        'select c1.id'+
                        ', c1.name'+
                        ', (select name from categories where c1.parent_id = categories.id) as ParentName'+
                        ' from categories c1' + 
                        ' where (select name from categories where c1.parent_id = categories.id) is null'
                       , {
                           type: QueryTypes.SELECT,
                           nest: true,
                         }).then(cats => {  
                            console.log("consulta db")
                             console.log(cats)
                            categories = cats

                            res.render('pages/products/productCreate', {
                                title,
                                product,
                                categories:cats
                            })


                         }).catch(error => {  
                             console.log(error.message);
                             
                           })


        

       

    },

    save: (req, res) => {
       let files =  req.files;
       console.log(files);
       let mainImage = files.find(f=>f.fieldname == 'mainImage')
       console.log(mainImage)
       let secondImage = files.find(f=>f.fieldname == 'secondImage')
       console.log(secondImage)

       let editionArr = req.body.edition.split(',')
console.log(editionArr);
console.log(editionArr.length);
       Product.create({
           
            name: req.body.name,
            slug: req.body.slug,
            description:req.body.description,
            price:  Number(req.body.price),
            image1: mainImage.originalname,
            image2: secondImage.originalname,
            category: req.body.subcategory,
            hasEdition: req.body.hasEdition == 'true' ? 1 : 0,
            edition: editionArr[0] != '' ? editionArr : null,
            stock: req.body.stock,
            isNew:req.body.type == 'nuevo' ? 1 : 0,
            rawApi:null

       }).then(()=> {
            return res.redirect("/productos/")
        })            
        .catch(error => res.send(error))

        // let products = fs.readFileSync(productsPath, 'utf-8');
        // products = JSON.parse(products);

        // let product = null;

        // let editionArr = req.body.edition.split(',')
      
        // product = {
        //     'id':products.length +1,
        //     'name': req.body.name,
        //     'price': req.body.price,
        //     'description':req.body.description,
        //     'hasEdition': req.body.hasEdition == 'true' ? true : false,
        //     'edition': editionArr,
        //     'isNew':req.body.type == 'nuevo' ? true : false,
        //     'category': req.body.category,
        //     'subcategory': req.body.subcategory,
        //     'stock': req.body.stock,
        //     'mainImage': mainImage.originalname,
        //     'secondImage': secondImage.originalname,
        //     'rawApi':null
        // }

        // console.log("Producto a crear: ");
        // console.log(product)

        // products.push(product);
        // productsFinal = JSON.stringify(products);
        // fs.writeFileSync(productsPath, productsFinal);
        
  
     // res.redirect("/productos/"+product.category+"/"+product.id)
    },

    edit: (req, res) => {
        let title = 'Gamebox | Editar Producto ';
        let product = null;
        let id = parseInt(req.params.id);
        
        console.log("Param Id: " + req.params.id);

        let products = fs.readFileSync(productsPath, 'utf-8');
        products = JSON.parse(products);

        let productFound = products.find( f => f.id == id);

        console.log(productFound);

        if(productFound == null || productFound == undefined){
            res.render('pages/not-found', {
                'title': 'Pagina no encontrada',
            })
        }

        product = {
            "id": id,
            'name': productFound.name,
            'price': productFound.price,
            'category': productFound.category,
            'description': productFound.description,
            'subcategory': productFound.subcategory,
            'type': productFound.isNew == true ? 'nuevo' : 'usado',
            'hasEdition': productFound.hasEdition == true ? 'true' : 'false',
            'edition': productFound.edition.join(','),
            'stock': productFound.stock,
            'mainImage': productFound.mainImage,
            'secondImage': productFound.secondImage
        }

        res.render('pages/products/productCreate', {
            'title': title,
            'product': product
        })
    },


    update: (req, res) => {
       let id = parseInt(req.params.id);
      
        let files =  req.files;
        console.log(files);
        let mainImage = files.find(f=>f.fieldname == 'mainImage')
        console.log(mainImage)
        let secondImage = files.find(f=>f.fieldname == 'secondImage')
        console.log(secondImage)
       
        let products = fs.readFileSync(productsPath, 'utf-8');
        products = JSON.parse(products);

        let product = null;

        let editionArr = req.body.edition.split(',')
      
        product = {
            'id':id,
            'name': req.body.name,
            'price': req.body.price,
            'description':req.body.description,
            'hasEdition': req.body.hasEdition == 'true' ? true : false,
            'edition': editionArr,
            'isNew': req.body.type == 'nuevo' ? true : false,
            'category': req.body.category,
            'subcategory': req.body.subcategory,
            'stock': req.body.stock,
             'mainImage': mainImage.originalname,
             'secondImage': secondImage.originalname,
            'rawApi':null
        }

        console.log('To Update: ')
        console.log(product)

        //Obtengo el indice del producto en la lista
        const i = products.map( p => p.id ).indexOf(id);

        //Lo saco de la lista
        if ( i > -1 ) {
            products.splice(i, 1);
        }

        //Vuelve a entrar a la lista
        products.push(product);
        productsFinal = JSON.stringify(products);
        fs.writeFileSync(productsPath, productsFinal);
        
  
      res.redirect("/productos/"+product.category+"/"+product.id)

    },

    delete: (req, res) => {
        let id = parseInt(req.params.id);
        let products = fs.readFileSync(productsPath, 'utf-8');
        products = JSON.parse(products);

        //Obtengo el indice del producto en la lista
        const i = products.map( p => p.id ).indexOf(id);

        //Lo saco de la lista
        if ( i > -1 ) {
            products.splice(i, 1);
        }

        productsFinal = JSON.stringify(products);
        fs.writeFileSync(productsPath, productsFinal);
        
  
        res.redirect("/productos")

    },
}

module.exports = productsController;