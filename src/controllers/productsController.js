
const path = require('path');
const fs = require('fs');
const db = require('../database/models');

const { QueryTypes } = require('sequelize');
const { log } = require('console');
const { title } = require('process');
const fetch = require('node-fetch');

const productsPath = path.resolve(__dirname, '../data/products.json');
const Category = db.Category;
const Product = db.Product;
const RawInfo = db.RawInfo;

function make_slug(str)
{
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9]+/g, '-');
    str = str.replace(/^-+|-+$/g, '');
    return str;
}

let productsController = {
  
    
    
    product: async (req, res) => {
        let title = 'Gamebox | ';
        let id = parseInt(req.params.id);

        let parentCategory = req.params.parentCategory;
        let childCategory = req.params.childCategory;
        let slugProduct = req.params.slugProduct;

        //let raw = await fetch('https://restcountries.eu/rest/v2/all').then(res => res.json());  

        db.Product.findOne({
            //include:[{association:'categories'}],
            include: [
                {
                model:Category,
                as : 'categories',
                where:{
                    slug:childCategory
                }
            },
            {
                model:RawInfo,
                as:'rawInfoObj'

            }
        ],


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

                    let  editionSplit = product.edition.split(',');
                    console.log(editionSplit);
                    let editions = [];
                    editionSplit.forEach(ed => {
                    let editionPriceSplit = ed.split(';')
                  
                    editions.push({
                            name : editionPriceSplit[0],
                            price: editionPriceSplit[1],
                        })  
                    });
                    product.editions = editions;
                }

                console.log(product)
                res.render('pages/products/productDetail', {
                    title: title, 
                    product:product,
                    user:req.session.userLogged
                    })
            })

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
                user:req.session.userLogged
              
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
                   user:req.session.userLogged
                 
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
                   user:req.session.userLogged
                   })


             }).catch(error => {  
                console.log(error.message);
                res.render('pages/error', {
                  title: title
              
                
                  })
              });
        }


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

    save: async (req, res) => {
       let files = req.files;
       console.log(files);
       let mainImage = files.find((f) => f.fieldname == "mainImage");
       console.log(mainImage);
       let secondImage = files.find((f) => f.fieldname == "secondImage");
       console.log(secondImage);

       //let editionArr = req.body.edition.split(',')

       if (req.body.category == "Juegos" || req.body.category == "Juegos") {
         let rawSearch = await fetch(
           "https://api.rawg.io/api/games?key=44a0fa1def1e4f3a970bc5170c09bd74&search=" +
             req.body.slug
         ).then((res) => res.json());
         //   console.log(rawSearch.results[0])

         let gameId = rawSearch.results[0].id;

         let rawDetails = await fetch(
           "https://api.rawg.io/api/games/" +
             gameId +
             "?key=44a0fa1def1e4f3a970bc5170c09bd74"
         ).then((res) => res.json());
         //    console.log(rawSearch.results[0])

         let ratingMax = rawDetails.ratings.reduce((a, b) =>
           a.count > b.count ? a : b
         );
         let genres = rawDetails.genres.map((a) => `${a.name}`).join(" ");
         let tags = rawDetails.tags.map((a) => `${a.name}`).join(" ");
         let platforms = rawDetails.platforms
           .map((a) => `${a.platform.name}`)
           .join(" ");

         console.log(ratingMax);
         console.log(genres);
         console.log(tags);
         console.log(platforms);

         let esrb = 99;

         switch (rawDetails.esrb_rating.name) {
           case "Mature":
             esrb = 17;
             break;
           case "Mature":
             esrb = 17;
             break;
           case "Mature":
             esrb = 17;
             break;
           default:
             break;
         }

         let newRawId = null;

         RawInfo.create({
           synopsis: rawDetails.description,
           launchDate: rawDetails.released,
           metacritic: rawDetails.metacritic,
           metacriticUrl: rawDetails.metacritic_platforms[0].url,
           rating: ratingMax.title,
           developer: rawDetails.developers[0].name,
           genres: genres,
           platforms: platforms,
           tags: tags,
           recommendedAge: esrb, //"17"
         })
           .then((data) => {
             console.log("Raw Info guardada!");
             console.log(data);
             console.log(data.id);
             newRawId = data.id;

             Product.create({
               name: req.body.name,
               slug: req.body.slug,
               description: req.body.description,
               price: Number(req.body.price),
               image1: mainImage.originalname,
               image2: secondImage.originalname,
               category: req.body.subcategory,
               hasEdition: req.body.hasEdition,
               edition: req.body.edition,
               stock: req.body.stock,
               isNew: req.body.type == "nuevo" ? 1 : 0,
               rawInfo: newRawId,
             })
               .then(() => {
                 return res.redirect("/productos/");
               })
               .catch((error) => res.send(error));
           })
           .catch((error) =>
             Product.create({
               name: req.body.name,
               slug: req.body.slug,
               description: req.body.description,
               price: Number(req.body.price),
               image1: mainImage.originalname,
               image2: secondImage.originalname,
               category: req.body.subcategory,
               hasEdition: req.body.hasEdition,
               edition: req.body.edition,
               stock: req.body.stock,
               isNew: req.body.type == "nuevo" ? 1 : 0,
               rawInfo: null,
             })
               .then(() => {
                 return res.redirect("/productos/");
               })
               .catch((error) => res.send(error))
           );
       } else {
         Product.create({
           name: req.body.name,
           slug: req.body.slug,
           description: req.body.description,
           price: Number(req.body.price),
           image1: mainImage.originalname,
           image2: secondImage.originalname,
           category: req.body.subcategory,
           hasEdition: req.body.hasEdition,
           edition: req.body.edition,
           stock: req.body.stock,
           isNew: req.body.type == "nuevo" ? 1 : 0,
           rawInfo: null,
         })
           .then(() => {
             return res.redirect("/productos/");
           })
           .catch((error) => res.send(error));
       }



    },

    edit: async (req, res) => {
        let title = 'Gamebox | Editar Producto ';
        let id = parseInt(req.params.id);
        
        productFound=await db.Product.findByPk(id)

        if(productFound == null || productFound == undefined){
            res.render('pages/not-found', {
                'title': 'Pagina no encontrada',
            })
        }

        console.log(productFound);

        var cats=await db.sequelize.query(
            'select c1.id'+
            ', c1.name'+
            ', (select name from categories where c1.parent_id = categories.id) as ParentName'+
            ' from categories c1' + 
            ' where (select name from categories where c1.parent_id = categories.id) is null'
           , {
               type: QueryTypes.SELECT,
               nest: true,
             })

        res.render('pages/products/productCreate', {
            title,
            product:productFound,
            categories:cats,
        })

    },


    update: async (req, res) => {
        let id = parseInt(req.params.id);
        productFound=await db.Product.findByPk(id)

        let files =  req.files;

        if (req.body.mainImage==undefined || req.body.secondImage==undefined){
            mainImage = productFound.image1
            secondImage = productFound.image2
        } else{
            console.log(files);
            let mainImage = files.find(f=>f.fieldname == 'mainImage').originalname
            console.log(mainImage)
            let secondImage = files.find(f=>f.fieldname == 'secondImage').originalname
            console.log(secondImage)
        }
        
        //let products = fs.readFileSync(productsPath, 'utf-8');
        //products = JSON.parse(products);
        let editionArr = req.body.edition.split(',')
        product={
            'name': req.body.name,
            'slug': req.body.slug,
            'description':req.body.description,
            'price':  Number(req.body.price),
            'image1': mainImage,
            'image2': secondImage,
            'category': req.body.subcategory,
            'hasEdition': req.body.hasEdition,
            'edition': editionArr,
            'stock': req.body.stock,
            'isNew':req.body.type == 'nuevo' ? 1 : 0,
            'rawApi':null            
        }

        if(product.edition){

            let editions = [];
            editionArr.forEach(ed => {
            let editionPriceSplit = ed.split(';')
          
            editions.push({
                    name : editionPriceSplit[0],
                    price: editionPriceSplit[1],
                })  
            });
            product.editions = editions;
        }

        db.Product.update({
            name: req.body.name,
            slug: req.body.slug,
            description:req.body.description,
            price:  Number(req.body.price),
            image1: mainImage.originalname,
            image2: secondImage.originalname,
            category: req.body.subcategory,
            hasEdition: req.body.hasEdition,
            edition: req.body.edition,
            stock: req.body.stock,
            isNew:req.body.type == 'nuevo' ? 1 : 0,
            rawApi:null
        },{
            where:{id:id}
        }).then(res.render('pages/products/productDetail',{title:title,product:product,  user:req.session.userLogged}))
    },

    delete: (req, res) => {
        let id = parseInt(req.params.id);
        db.Product.destroy({
            where:{id:id}
        }).then(res.redirect("/productos"))
        
    },
}

module.exports = productsController;