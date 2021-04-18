  
const path = require('path');


const cartController = {
    cart: (req, res) => {
        let title = 'Carrito de Compras';

        let productList = [];

        res.render('pages/productCart', {
            'title': title,
            productList
        });
    }
};

module.exports = cartController;