
const path = require('path');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const {validationResult} = require('express-validator');

//Requiero el modelo
const User = db.User;
const UserType = db.UserType;
const titleLogin = 'Gamebox | Login '

const usersController = {
    login: (req, res) => {
        res.render('pages/users/login', {
            'title': titleLogin
        })
    },


    loginProcess: async (req, res) => {
       //res.send(user[0].password)
        //res.send(bcryptjs.compareSync(req.body.password, user[0].password))
        let errors = validationResult(req);
        let user = await db.User.findAll({
            where: {
                email: req.body.email
            }
        });
        console.log(errors);
        if(errors.isEmpty()){
            if (user != "") {

                let checkPass = bcryptjs.compareSync(req.body.password, user[0].password);
                if (checkPass) {
                    delete user[0].password;
                    req.session.userLogged = user[0];
    
                    if (req.body.sesion) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 30 })
                    }
    
                    // return res.send(req.session.userLogged)
    
                    // res.render('pages/index', {
                    //     title: title,
                    //     user : req.session.userLogged
                    // })
    
                    return res.redirect('/');
                } else {
                    return res.render('pages/users/login', {
                        title: titleLogin,
                        errors: {
                            email: {
                                msg: 'Las credenciales son inválidas'
                            }
                        },
                        oldData: req.body
                    });
                }
            }
    
    
    
            return res.render('pages/users/login', {
                title: titleLogin,
                errors: {
                    email: {
                        msg: 'No se encuentra este email en la base de datos'
                    }
                },
                oldData: req.body
            });
        }else{

            return res.render('pages/users/login', {
                title: titleLogin,
                errors: errors.mapped(),
                oldData: req.body
            });
        }

        



    },


    logout: (req, res) => {
        req.session.destroy();

        res.clearCookie('userEmail');

        return res.redirect('/');
    },

    register: (req, res) => {


        let title = 'Gamebox | Registro ';

        res.render('pages/users/register', {
            'title': title,
            errorMailExist:null,
            errorImage:null
        })
    },


    register_new_user: async (req, res) => {
        let errors = validationResult(req);
        let title = 'Gamebox | Registro ';
        let userindb = await db.User.findAll({
            where: { email: req.body.email }
        })

        
       
        if(errors.isEmpty()){
            console.log("aca no hay errores: ");
            
            if (userindb != "") {
                console.log("aca userindb: ");
                return res.render('pages/users/register', {
                    'title': title,
                    errors: {
                        email: {
                            msg: 'Ya existe una cuenta asociada a este correo'
                        },
                    },
                    errorMailExist:null,
                    errorImage: null,
                    oldData: req.body
                });
            }

            if(req.file && req.file != undefined && !(req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/gif' || req.file.mimetype == 'image/png')){
                console.log("aca mimetype: ");
                return res.render('pages/users/register', {
                    'title': title,
                    errors: {
                        image: {
                            msg: 'Debes subir solo archivos de imagen (JPG, PNG, GIF)'
                        },
                    },
                    errorMailExist:null,
                    errorImage: null,
                    oldData: req.body
                    
                });
            }

    
            if(req.file && req.file !== undefined){
              
                req.body.avatar=req.file.filename
            } else{
                req.body.avatar='default-avatar.jpg'
            }
    
            req.body.password=bcryptjs.hashSync(req.body.password,10)
            //res.send(req.body)
            db.User.create({
                firstName: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                avatar: req.body.avatar,
                password: req.body.password,
                type: 1,
            }).then(() => res.redirect('/login')).catch(error => res.send(error))
        }else{
            console.log("aca hay errores: ");
            console.log(errors);
           // console.log(errors.mapped);
            console.log(req.body)

            if (userindb != "") {
                return res.render('pages/users/register', {
                    'title': title,
                    errors: errors.mapped(),
                    oldData: req.body,
                    errorMailExist: 'Ya existe una cuenta asociada a este correo',
                    errorImage: null
                });
            }

            if(req.file && req.file != undefined && !(req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/gif' || req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpg')){
                return res.render('pages/users/register', {
                    'title': title,
                    errors: errors.mapped(), 
                    oldData: req.body,
                    errorMailExist:null,
                    errorImage:'Debes subir solo archivos de imagen (JPEG, JPG, PNG, GIF)'
                });
            }

            return res.render('pages/users/register', {
                'title': title,
                errors: errors.mapped(),
                oldData: req.body,
                errorMailExist:null,
                errorImage:null
            });
        }
    
      


    },

    profile: (req, res) => {

        let title = 'Gamebox | Perfil ';

        if (req.session.userLogged) {
            res.render('pages/users/profile', {
                'title': title,
                user: req.session.userLogged
            })
        } else {
            res.redirect('/')
        }
    },

    list:(req,res) => {
        let title = 'Gamebox | Lista de usuarios';

        User.findAll({
            //include:[{association:'UserUserType'}],
            include:[{
                model:UserType,
                as:'UserTypeObj'

            }]
        })
            .then(users => {

                console.log(JSON.stringify(users))
                if(users == null || users == undefined ){
                    res.render('pages/products/productNotFound', {
                        'title': 'Sin resultados',
                        'description':'Usuarios no encontrados',
                        user:req.session.userLogged
                    })
                }
                
                //console.log(product)
                res.render('pages/users/userList', {
                    title: title, 
                    users:users,
                    user:req.session.userLogged
                    })
            })

    },
    edit:(req,res) => {
        let title = 'Gamebox | Editar usuarios';

       

    }

};

module.exports = usersController;