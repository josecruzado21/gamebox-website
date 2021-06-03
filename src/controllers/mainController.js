const path = require('path');
const mainController = {
    home: (req, res) => {
        let title = 'Gamebox | Videojuegos y mas';
        res.render('pages/index', 
        {
            'title': title,
            'user' : req.session.userLogged,
        });
    },
};

module.exports = mainController;