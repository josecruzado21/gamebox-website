const express = require('express')
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const publicPath = path.resolve(__dirname, './public');
app.use('/static',express.static(publicPath));

app.listen(3030, ()=>{
    console.log("servidor corriendo");
})

// set the view engine to ejs
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (req,res) => {
    res.render('pages/index');
})

app.get('/registro', (req,res) => {
   
    res.render('pages/register');
})

app.get('/login', (req,res) => {
  
    res.render('pages/login');
})

app.get('/carrito-de-compras', (req,res) => {
 
    res.render('pages/productCart');
})

app.get('/detalle', (req,res) => {
  
    res.render('pages/productDetail');
})