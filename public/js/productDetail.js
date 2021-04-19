
const edition = document.querySelector('#edition');
const productPrice = document.querySelector('#productPrice');
const productPriceHidden = document.querySelector('#productPriceHidden');
const addToCart = document.querySelector('#addToCartDetail');
const cartCount = document.querySelector('#cartCount');

import {cart} from './cartLogic.js'


let product = {};

window.addEventListener("load", function(){
   
    let locationSplit = location.pathname.split("/");
    console.log(locationSplit);

    let parent = locationSplit[2];
    let child =  locationSplit[3];
    let productName = locationSplit[4];

    fetch(location.origin+'/api/productos/' + parent + '/' + child + '/' + productName)
    .then(response => response.json())
    .then(data => {        
        console.log(data);
        product = data;

        if(product.hasEdition == 1){
            let  editionSplit = product.edition.split(',');
            console.log(editionSplit);

            let editionPriceSplit  = editionSplit[0].split(";")
            console.log(editionPriceSplit);

            productPrice.innerHTML =  "$ " + new Intl.NumberFormat("es-CO").format(editionPriceSplit[1]) 
        }

    });

})

addToCart.addEventListener("click", function(e){
    e.stopPropagation();
    console.log(e)
    cartCount.dataset.count++; 

    let userId = addToCart.dataset.userid;

    let productToAdd = {}
    productToAdd.name = addToCart.dataset.name;
    productToAdd.price = addToCart.dataset.price;
    productToAdd.quantity = 1;
    productToAdd.id = addToCart.dataset.id
    productToAdd.image = addToCart.dataset.image;
    productToAdd.hasEdition = addToCart.dataset.hasedition;
    productToAdd.edition = addToCart.dataset.edition;
    productToAdd.category = addToCart.dataset.category;


    cart(productToAdd, userId);
})


if(edition != null){
    edition.addEventListener("change", function(e){
        let selected = e.target.value;
        console.log(selected);
    
        console.log(product);
    
        let  editionSplit = product.edition.split(',');
        console.log(editionSplit);
        let editions = [];
        editionSplit.forEach(ed => {
        let editionPriceSplit = ed.split(';')
      
        editions.push({
                name : editionPriceSplit[0],
                price: editionPriceSplit[1],
            })  
        });
    
        let editionSelected = editions.find(f=>f.name == selected);
        console.log("editionSelected");
        console.log(editionSelected);
      
        productPrice.innerHTML = "$ " + new Intl.NumberFormat("es-CO").format(editionSelected.price) 
    
    });
}



