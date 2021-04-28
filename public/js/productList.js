const addToCartButtons = document.querySelectorAll('.button-list');
const cartCount = document.querySelector('#cartCount');
import { cart } from './cartLogic.js'



var cookieArr = document.cookie.split(";");

console.log("cookies");
console.log(cookieArr);

addToCartButtons.forEach(function (currentBtn) {
    currentBtn.addEventListener("click", function (e) {
        e.stopPropagation();

        console.log("user");
        console.log(currentBtn.dataset.userid);

        if (currentBtn.dataset.userid == null || currentBtn.dataset.userid == undefined || currentBtn.dataset.userid == '') {
            window.location.replace(location.origin + '/login');
        }

        let userId = currentBtn.dataset.userid

        cartCount.dataset.count++;

        let productToAdd = {}
        productToAdd.name = currentBtn.dataset.name;
        productToAdd.price = currentBtn.dataset.price;
        productToAdd.quantity = 1;
        productToAdd.id = currentBtn.dataset.id
        productToAdd.image = currentBtn.dataset.image;
        productToAdd.hasEdition = currentBtn.dataset.hasedition;
        productToAdd.edition = currentBtn.dataset.edition;
        productToAdd.category = currentBtn.dataset.category;

        cart(productToAdd, userId);

    })

})
