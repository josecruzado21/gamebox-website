'use strict';
const db = require('../database/models');

//Requiero el modelo
const User = db.User;
const UserType = db.UserType;


const usersApiController = {
   
    getUsers:(req, res) => {
        let page = req.query.page;
        let offset = 0;

        if(page == null || page ==undefined){
            page = 1
        }else if(page > 1){
            offset = (page - 1 )*10;
        }

        User.findAll({ limit : 10, offset:offset })
        .then(users => {  
                
            let respUsers = [];
            let resp = {}

            if(users == null || users == undefined || users.lenght <= 0){
                 resp = {"count": 0, users:[] }
            }

            users.forEach(user => 
            {
                let r = {}
                r.name = user.firstName + " " +user.lastName;
                r.email = user.email;
                r.id = user.id;
                r.detail = req.protocol + '://' + req.get('host') + "/api/users/"+r.id

                respUsers.push(r);
            });

             resp = {"count": respUsers.length, users:respUsers }


            res.json(resp)

        }).catch(error => {  
            console.log(error.message);
            let resp = {
                error: "Error obteniendo los usuarios " + error.message
            }
            res.json(resp);
          })

    },

    getUserDetail:(req, res) => {
       
        User.findByPk(req.params.id)
        .then(user => {  

            let resp = JSON.parse(JSON.stringify(user));

            resp.password = undefined
            resp.type = undefined
            resp.avatar = req.protocol + '://' + req.get('host') +"/images/avatars/"+user.avatar

            res.json(resp)
        }).catch(error => {  
            console.log(error.message);
            let resp = {
                error: "Error obteniendo los usuarios"
            }
            res.json(resp);
          })
    }
   
   


};

module.exports = usersApiController;