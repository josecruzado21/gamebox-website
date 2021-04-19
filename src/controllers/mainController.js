const path = require('path');
const mainController = {
    home: (req, res) => {
        let title = 'Gamebox | Videojuegos y mas';
        res.render('pages/index', 
        {
            'title': title
        });
    },
};

module.exports = mainController;