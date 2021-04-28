
const path = require('path');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');
//Requiero el modelo
const User = db.User;

const titleLogin = 'Gamebox | Login '

const usersController = {
    login: (req, res) => {
        res.render('pages/users/login', {
            'title': titleLogin
        })
    },


    loginProcess: async (req, res) => {
        //return res.send(req.body)

        let user = await db.User.findAll({
            where: {
                email: req.body.email
            }
        });

        //res.send(user[0].password)
        //res.send(bcryptjs.compareSync(req.body.password, user[0].password))

        if (user != "") {

            let checkPass = bcryptjs.compareSync(req.body.password, user[0].password);
            if (checkPass) {
                delete user[0].password;
                req.session.userLogged = user[0];

                if (req.body.sesion) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 30 })
                }

                return res.redirect('/usuarios/perfil');
            } else {
                return res.render('pages/users/login', {
                    title: titleLogin,
                    errors: {
                        email: {
                            msg: 'Las credenciales son inválidas'
                        }
                    }
                });
            }
        }



        return res.render('pages/users/login', {
            title: titleLogin,
            errors: {
                email: {
                    msg: 'No se encuentra este email en la base de datos'
                }
            }
        });

    },


    logout: (req, res) => {
        req.session.destroy();

        res.clearCookie('userEmail');

        return res.redirect('/');
    },

    register: (req, res) => {


        let title = 'Gamebox | Registro ';

        res.render('pages/users/register', {
            'title': title
        })
    },

    register_new_user: async (req, res) => {
        let title = 'Gamebox | Registro ';
        let userindb = await db.User.findAll({
            where: { email: req.body.email }
        })
        if (userindb != "") {
            return res.render('pages/users/register', {
                'title': title,
                errors: {
                    email: {
                        msg: 'Ya existe una cuenta asociada a este correo'
                    },
                },
                oldData: req.body
            });
        }

        if(req.file && req.file!== undefined){
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
    }
};

module.exports = usersController;