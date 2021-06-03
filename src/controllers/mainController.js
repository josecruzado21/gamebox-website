const path = require('path');
const db = require('../database/models');
const { QueryTypes, Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const Product = db.Product;
const Category = db.Category;


const mainController = {
    home: (req, res) => {
        let title = 'Gamebox | Videojuegos y mas';
     
        Product.findAll({limit : 4,
            include: [{
                model:Category,
                as : 'categories',
                include: [{
                    model:Category,
                    as : 'parentCategory',
                    
                } ],
            } ],
            where: {
                homeTags: {
                    [Op.like]: '%banner%'
                  }
            },
            order: [
                ['id', 'DESC']
               
            ],
        })
            .then(products => {
                console.log("products banner")
              console.log(products)
            //  res.json(products)

              res.render('pages/index', 
              {
                  'title': title,
                  'user' : req.session.userLogged,
                   productsBanner:products
              });

            })

     
        // res.render('pages/index', 
        // {
        //     'title': title,
        //     'user' : req.session.userLogged,
        // });
    },
};

module.exports = mainController;