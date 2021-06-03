
const addToCartButtonsHome = document.querySelectorAll('.cartBtnThumb');
const cartCount = document.querySelector('#cartCount');
import { cart } from './cartLogic.js'



var cookieArr = document.cookie.split(";");



addToCartButtonsHome.forEach(function (currentBtn) {
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

      modal.style.display = "block";

  })

})


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var myBtnHome = document.getElementById("myBtnHome");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on the button, open the modal
// myBtnHome.onclick = function() {

//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}