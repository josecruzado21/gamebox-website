const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const path = require('path');
const app = express();

const publicPath = path.resolve(__dirname, '../public');
//app.use('/static',express.static(publicPath));
app.use(express.static(publicPath));

app.listen(3030, ()=>{
    console.log("servidor corriendo");
})

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views/'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:"Secret",
    resave:false,
    saveUninitialized:false
}));

app.use(cookieParser());

app.use(userLoggedMiddleware);

app.use(methodOverride("_method"));

// app.use((req, res, next) => {
//     res.status(404).render('pages/not-found');
// })

//Routes
const mainRouter = require('./routes/main');
const productRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const apiRouter = require('./routes/api');

app.use(mainRouter);
app.use('/productos', productRouter);
app.use('/usuarios', usersRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);