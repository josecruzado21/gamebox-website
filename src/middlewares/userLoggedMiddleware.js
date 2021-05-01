const User = require('../models/User')
const db = require('../database/models');


async function  userLoggedMiddleware(req, res, next){

    res.locals.isLogged = false;

    if(req.cookies){

        let emailInCookie = req.cookies.userEmail;
     //   let userFromCookie = User.findByProperty('email', emailInCookie);

     if(emailInCookie != null && emailInCookie != undefined){
        let user = await db.User.findAll({
            where: {
                email: emailInCookie
            }
        });


        if(user != null && user != undefined){
            req.session.userLogged = user[0];
        }

    }
}


    if(req.session &&  req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }


    
    next();
}


module.exports = userLoggedMiddleware;