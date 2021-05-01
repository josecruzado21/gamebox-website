const path = require('path');
const fs = require('fs');
const db = require('../database/models');

const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

var moment = require('moment'); // require

const languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    authenticator: new IamAuthenticator({
      apikey: 'Ccdodn5cOgaE-BEEJV3b1pF2f3OB23BeHZIp6M1BwiNh',
    }),
    serviceUrl: 'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/29b27ae0-b540-41f2-9ac5-20995f046fa3',
    disableSslVerification: true,
  });
  
  const translateParams = {
    text: 'Hello, how are you today?',
    modelId: 'en-es',
  };
  

const { QueryTypes } = require('sequelize');
const { log } = require('console');
const { title } = require('process');
const fetch = require('node-fetch');

const productsPath = path.resolve(__dirname, '../data/products.json');
const Category = db.Category;
const Product = db.Product;
const RawInfo = db.RawInfo;


let productsController = {
  
    product: async (req, res) => {
        let title = 'Gamebox | ';
        let id = parseInt(req.params.id);

        let parentCategory = req.params.parentCategory;
        let childCategory = req.params.childCategory;
        let slugProduct = req.params.slugProduct;

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
                        'description':'Producto no encontrado',
                        user:req.session.userLogged
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

    list: async (req, res) => {
       
        let title = 'Gamebox | Lista de Productos ';
       
        let queryString = req.query.search; 

        let page = req.query.page;

        let offset = 0;

        let count = 0;

        let pagesNumber = 0;

        if(page > 1){
            offset = (page - 1 )*10;
        }

        if(page == null || page ==undefined){
            page =1
        }

        let parentCategory = req.params.parentCategory;
        let childCategory = req.params.childCategory;

        //Busqueda
        if(queryString != null && queryString != undefined){
            queryString = queryString.toLowerCase() ;
            
            //Obtiene conteo para paginador
            db.sequelize.query('SELECT count(*) AS count ' + 
            'FROM `products` AS `Product` ' +
            'LEFT OUTER JOIN `categories` AS `categories` ' +
            'ON `Product`.`category` = `categories`.`id`' + 
            'where LOWER( `categories`.`slug` )  = LOWER(:queryString1 ) or LOWER( `Product`.`name` ) like :queryString2', 
             {
               type: QueryTypes.SELECT,
               nest: true,
               replacements: { queryString1: queryString, queryString2: '%'+queryString+'%' },
             }).then(c => { 
                    count = c[0].count;
             }).catch(error => {  
                 console.log(error.message);
                 res.render('pages/error', {
                   title: title,
                   user:req.session.userLogged
                 
                   })
               })

               pagesNumber = Math.ceil(count/10);

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
            'where LOWER( `categories`.`slug` )  = LOWER(:queryString1 ) or LOWER( `Product`.`name` ) like :queryString2 '+
            'limit 10 offset :offset', 
             {
               type: QueryTypes.SELECT,
               nest: true,
               replacements: { queryString1: queryString, queryString2: '%'+queryString+'%', offset: offset },
             }).then(prds => {  
   
                 if(prds == null || prds == undefined || prds.length < 1){
                   res.render('pages/products/productNotFound', {
                       'title': 'Sin resultados',
                       'description':'Lo sentimos no encontramos productos',
                       user:req.session.userLogged
                   })
               }else{
                   res.render('pages/products/productList', {
                       title: title, 
                       products:prds,
                       user:req.session.userLogged,
                       count:count,
                       pagesNumber:pagesNumber,
                       page:page,
                       parentCategory:parentCategory,
                       childCategory:childCategory,
                       queryString:queryString
                       })
               }
   
   
             }).catch(error => {  
                 console.log(error.message);
                 res.render('pages/error', {
                   title: title,
                   user:req.session.userLogged
                 
                   })
               })


        }else{

        
        //Busca productos sin categoria
        if(parentCategory == null || parentCategory == undefined ){
        //Obtiene conteo para paginador
        await  db.sequelize.query('SELECT count(*) AS count ' +    
            'FROM `products` AS `Product` ' +
            'LEFT OUTER JOIN `categories` AS `categories` ' +
            'ON `Product`.`category` = `categories`.`id`'  
            , {
               type: QueryTypes.SELECT,
               nest: true
             }).then(c => {  
                console.log("termina consulta conteo");
                console.log(c);
                count = c[0].count
             }).catch(error => {  
                 console.log(error.message);
                 res.render('pages/error', {
                   title: title,
                   user:req.session.userLogged
                 
                   })
               })

               pagesNumber = Math.ceil(count/10);

        await db.sequelize.query('SELECT `Product`.`id`,' + 
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
         'ON `Product`.`category` = `categories`.`id` '  +
         'limit 10 offset :offset'
         , {
            type: QueryTypes.SELECT,
            nest: true,
            replacements: { offset: offset },
          }).then(prds => {  

              if(prds == null || prds == undefined || prds.length < 1){
                res.render('pages/products/productNotFound', {
                    'title': 'Sin resultados',
                    'description':'Lo sentimos no encontramos productos',
                    user:req.session.userLogged
                })
            }else{
                console.log(count);
                res.render('pages/products/productList', {
                    title: title, 
                    products:prds,
                    user:req.session.userLogged,
                    count,
                    pagesNumber:pagesNumber,
                    page:page,
                    parentCategory:parentCategory,
                    childCategory:childCategory,
                    queryString:queryString
                    
                    })
            }


          }).catch(error => {  
              console.log(error.message);
              res.render('pages/error', {
                title: title,
                user:req.session.userLogged
              
                })
            })
         
      
        }

        //Busca por categorias principales
        if(parentCategory != null && parentCategory != undefined && (childCategory == null || childCategory == undefined)){


            //Obtiene conteo para paginador
            db.sequelize.query('SELECT count(*) AS count ' + 
            'FROM `products` AS `Product` ' +
            'LEFT OUTER JOIN `categories` AS `categories` ' +
            'ON `Product`.`category` = `categories`.`id`' + 
            'where (select slug from categories as c2 where categories.parent_id = c2.id) = :parentCategory', 
            
            {
               type: QueryTypes.SELECT,
               nest: true,
               replacements: { parentCategory: parentCategory },
             
             }).then(c => {  
                count = c[0].count

             }).catch(error => {  
                console.log(error.message);
                res.render('pages/error', {
                  title: title ,
                  user:req.session.userLogged
                
                  })
              });

              

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
            'where (select slug from categories as c2 where categories.parent_id = c2.id) = :parentCategory ' +
            'limit 10 offset :offset'
            , 
            
            {
               type: QueryTypes.SELECT,
               nest: true,
               replacements: { parentCategory: parentCategory, offset: offset },
             
             }).then(prds => {  
                pagesNumber = Math.ceil(count/10);
                 if(prds == null || prds == undefined || prds.length < 1){
                    res.render('pages/products/productNotFound', {
                        'title': 'Sin resultados',
                        'description':'Lo sentimos no encontramos productos',
                        user:req.session.userLogged
                    })
                }else{
                    console.log(count)
                    console.log(pagesNumber)
                    res.render('pages/products/productList', {
                        title: title, 
                        products:prds,
                        user:req.session.userLogged,
                        count,
                        pagesNumber:pagesNumber,
                        page:page,
                        parentCategory:parentCategory,
                        childCategory:childCategory,
                        queryString:queryString
                        })
                }

             }).catch(error => {  
                console.log(error.message);
                res.render('pages/error', {
                  title: title ,
                  user:req.session.userLogged
                
                  })
              });

            
        }

        //Busca por categorias secundarias
        if(childCategory != null && childCategory != undefined ){
        
            //Obtiene conteo para paginador
            db.sequelize.query('SELECT count(*) AS count ' + 
            'FROM `products` AS `Product` ' +
            'LEFT OUTER JOIN `categories` AS `categories` ' +
            'ON `Product`.`category` = `categories`.`id`' + 
            'where (select slug from categories as c2 where categories.parent_id = c2.id) = :parentCategory' +
            ' and `categories`.`slug` = :childCategory', 
            
            {
               type: QueryTypes.SELECT,
               nest: true,
               replacements: { parentCategory: parentCategory, childCategory: childCategory },
             
             }).then(c => {  
                count = c[0].count
   
             }).catch(error => {  
                console.log(error.message);
                res.render('pages/error', {
                  title: title,
                  user:req.session.userLogged
                
                  })
              });
         
            
              
            
         
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
            ' and `categories`.`slug` = :childCategory '+
            'limit 10 offset :offset' , 
            
            {
               type: QueryTypes.SELECT,
               nest: true,
               replacements: { parentCategory: parentCategory, childCategory: childCategory, offset: offset },
             
             }).then(prds => {  

                pagesNumber = Math.ceil(count/10);
                         if(prds == null || prds == undefined || prds.length < 1){
                            res.render('pages/products/productNotFound', {
                                'title': 'Sin resultados',
                                'description':'Lo sentimos no encontramos productos',
                                user:req.session.userLogged
                            })
                        }else{
                            res.render('pages/products/productList', {
                                title: title, 
                                products:prds,
                                user:req.session.userLogged,
                                count,
                                pagesNumber:pagesNumber,
                                page:page,
                                parentCategory:parentCategory,
                                childCategory:childCategory,
                                queryString:queryString
                                })
                        }




             }).catch(error => {  
                console.log(error.message);
                res.render('pages/error', {
                  title: title,
                  user:req.session.userLogged
                
                  })
              });
        }
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
                                categories:cats,
                                user:req.session.userLogged
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
           "https://api.rawg.io/api/games?key=1f24a4342da044cd871a3dee991ff147&search=" +
             req.body.slug
         ).then((res) => res.json());
         //   console.log(rawSearch.results[0])

         let gameId = rawSearch.results[0].id;

         let rawDetails = await fetch(
           "https://api.rawg.io/api/games/" +
             gameId +
             "?key=1f24a4342da044cd871a3dee991ff147"
         ).then((res) => res.json());
             console.log(rawSearch.results[0])

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
           case "Everyone":
             esrb = "Todos";
             break;
           case "Everyone 10+":
             esrb = "Todos 10+";
             break;
           case "Teen":
                esrb = "Adolescentes";
                break;             
           case "Mature":
                esrb = "Maduro +17";
                break;  
           case "Adults Only":
                esrb = "Adultos unicamente +18";
                break;  
           case "Rating Pending":
             esrb = "Sin clasificación";
             break;
           default:
             break;
         }

         let newRawId = null;

         let translation = null;
         translateParams.text = rawDetails.description;
   
         await languageTranslator.translate(translateParams)
         .then(translationResult => {
           console.log("-----TRADUCIENDO------");
           console.log(JSON.stringify(translationResult, null, 2));
           translation = translationResult.result.translations[0].translation;


           RawInfo.create({
            synopsis: translation,
            launchDate: rawDetails.released,
            metacritic: rawDetails.metacritic == null ? 0 :rawDetails.metacritic ,
            metacriticUrl: rawDetails.metacritic_platforms[0]?.url == null ? 'https://www.metacritic.com/game' : rawDetails.metacritic_platforms[0]?.url,
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
            .catch((error) => {
               console.error(error);
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
            }
            );

         })
         .catch(err => {
           console.log('error:', err);
         });



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
                user:req.session.userLogged
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
            user:req.session.userLogged
        })

    },

    editInfo: async (req, res) => {
        let title = 'Gamebox | Editar mas info producto ';
        let id = parseInt(req.params.id);
        
        console.log("buscando raw info");

        infoFound=await RawInfo.findByPk(id)

        if(infoFound == null || infoFound == undefined){
            res.render('pages/not-found', {
                'title': 'Pagina no encontrada',
            })
        }

        console.log(infoFound);
        var newDate = moment(infoFound.launchDate).utc().format("YYYY-MM-DD")
        console.log(newDate);
       

        res.render('pages/products/rawInfoEdit', {
            title,
            info:infoFound,
            user:req.session.userLogged,
            newDate
         
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
            isNew:req.body.type == 'nuevo' ? 1 : 0
         
        },{
            where:{id:id}
        }).then(
            res.redirect("/productos/")
        )
    },


    updateInfoRaw: async (req, res) => {
        let id = parseInt(req.params.id);
       // infoFound=await RawInfo.findByPk(id)
        console.log("actualizando rawinfo")
        console.log(JSON.stringify(req.body))
     await RawInfo.update({
            synopsis:req.body.synopsis,
            launchDate:  req.body.launchDate,
            metacritic: req.body.metacritic,
            metacriticUrl: req.body.metacriticUrl,
            rating: req.body.rating,
            developer: req.body.developer,
            genres: req.body.genres,
            platforms: req.body.platforms,
            tags:req.body.tags,
            recommendedAge:req.body.recommendedAge
        },{
            where:{id:id}
        }).then(a=>
            {
              console.log("Raw Actualizado!")
              res.redirect("/productos/")
            }
    
            )
    },

    delete: (req, res) => {
        let id = parseInt(req.params.id);
        db.Product.destroy({
            where:{id:id}
        }).then(res.redirect("/productos"))
        
    },
}

module.exports = productsController;