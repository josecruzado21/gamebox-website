const User = require('../models/User')

function userLoggedMiddleware(req, res, next){

    res.locals.isLogged = false;

    if(req.cookies){

        let emailInCookie = req.cookies.userEmail;
        let userFromCookie = User.findByProperty('email', emailInCookie);
        if(userFromCookie){
            req.session.userLogged = userFromCookie;
        }

    }


    if(req.session &&  req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }


    
    next();
}


module.exports = userLoggedMiddleware;