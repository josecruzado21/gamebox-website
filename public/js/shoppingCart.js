 window.addEventListener("load", function () {

    const minus = document.querySelectorAll('.minus');
    const plus = document.querySelectorAll('.plus');
    const erase = document.querySelectorAll('.icon-erase');
    const erase2 = document.querySelectorAll('.icon-erase2');


    const beforeTaxShoppingCart= document.querySelector('#beforeTaxShoppingCart');
    const taxShoppingCart= document.querySelector('#taxShoppingCart');
    const totalShoppingCart= document.querySelector('#totalShoppingCart');
   
   
   


    minus.forEach(function (currentBtn) {
        let cartId = Number(currentBtn.dataset.cartid);
        let productCartId = Number(currentBtn.dataset.id);
        let price = Number(currentBtn.dataset.price);

        currentBtn.addEventListener("click", function (e) {

            e.stopPropagation();

            const productQuantity = document.querySelector('#productQuantity-'+productCartId);
            const itemsQuantity = document.querySelector('.itemsQuantityHide');
            const total = document.querySelector('.totalHide');
    
            let itemsInCart =  Number(itemsQuantity.innerText);
            let totalInCart =  Number(total.innerText);

            let number = parseInt(productQuantity.value);   

            if(number == 1){
                return false;
            }

            var count =number - 1;
            count = count < 1 ? 1 : count;
            productQuantity.value = count;

            itemsInCart = itemsInCart - 1; 
            totalInCart = totalInCart - price;

            //Update producto en carrito
            let productCart = {};
            productCart.quantity = productQuantity.value;
            productCart.id = productCartId;


            //Actualizar en shoppingCartProducts
            fetch(location.origin + '/api/carrito-compras-producto/',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(productCart)
                }
            )
                .then(response => response.json())
                .then(data => {
                    console.log("producto actualizado en carrito");
                    console.log(data);

                    //update cart
                    console.log("Actualizando carrito " + cartId)
                    //console.log(cartFound)
                    let cartFound = {}
                    cartFound.totalPrice = totalInCart;
                    cartFound.itemsQuantity = itemsInCart;
                    cartFound.id = cartId

                    console.log("Actualizando carrito despues ")
                    console.log(cartFound)
                    fetch(location.origin + '/api/carrito-compras/',
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: JSON.stringify(cartFound)
                        }
                    )
                        .then(response => response.json())
                        .then(data => {
                            console.log("carrito actualizado: " + cartFound.id);
                            console.log(data);

                             beforeTaxShoppingCart.innerText  = "$ " + new Intl.NumberFormat("es-CO").format(totalInCart - (totalInCart*0.19))

                             taxShoppingCart.innerText  ="$ " + new Intl.NumberFormat("es-CO").format(totalInCart*0.19)

                             totalShoppingCart.innerText  = "$ " + new Intl.NumberFormat("es-CO").format(totalInCart)

                              itemsQuantity.innerText = itemsInCart
                              total.innerText = totalInCart

                        });

                });




        
            return false;
        })
    })

    plus.forEach(function (currentBtn) {
        let cartId = Number(currentBtn.dataset.cartid);
        let productCartId = Number(currentBtn.dataset.id);
        let price = Number(currentBtn.dataset.price);

        currentBtn.addEventListener("click", function (e) {
            e.stopPropagation();

            const productQuantity = document.querySelector('#productQuantity-'+productCartId);
            const itemsQuantity = document.querySelector('.itemsQuantityHide');
            const total = document.querySelector('.totalHide');
    
            let itemsInCart =  Number(itemsQuantity.innerText);
            let totalInCart =  Number(total.innerText);

            productQuantity.value = (parseInt(productQuantity.value) + 1);

            itemsInCart = itemsInCart + 1; 
            totalInCart = totalInCart + price;

            //Update producto en carrito
            let productCart = {};
            productCart.quantity = productQuantity.value;
            productCart.id = productCartId;


            //Actualizar en shoppingCartProducts
            fetch(location.origin + '/api/carrito-compras-producto/',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(productCart)
                }
            )
                .then(response => response.json())
                .then(data => {
                    console.log("producto actualizado en carrito");
                    console.log(data);

                    //update cart
                    console.log("Actualizando carrito " + cartId)
                    //console.log(cartFound)
                    let cartFound = {}
                    cartFound.totalPrice = totalInCart;
                    cartFound.itemsQuantity = itemsInCart;
                    cartFound.id = cartId

                    console.log("Actualizando carrito despues ")
                    console.log(cartFound)
                    fetch(location.origin + '/api/carrito-compras/',
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: JSON.stringify(cartFound)
                        }
                    )
                        .then(response => response.json())
                        .then(data => {
                            console.log("carrito actualizado: " + cartFound.id);
                            console.log(data);
                            
                            beforeTaxShoppingCart.innerText  = "$ " + new Intl.NumberFormat("es-CO").format(totalInCart - (totalInCart*0.19))

                            taxShoppingCart.innerText  ="$ " + new Intl.NumberFormat("es-CO").format(totalInCart*0.19)

                            totalShoppingCart.innerText  = "$ " + new Intl.NumberFormat("es-CO").format(totalInCart)

                            itemsQuantity.innerText = itemsInCart
                            total.innerText = totalInCart
                        });

                });



        
            return false;
        })
    })









    erase.forEach(function (currentBtn) {
        let cartId = Number(currentBtn.dataset.cartid);
        let productCartId = Number(currentBtn.dataset.id);
        let price = Number(currentBtn.dataset.price);

        currentBtn.addEventListener("click", function (e) {

            e.stopPropagation();

            const productQuantity = document.querySelector('#productQuantity-'+productCartId);
            const itemsQuantity = document.querySelector('.itemsQuantityHide');
            const total = document.querySelector('.totalHide');
            const productArticle = document.querySelector('#product-'+productCartId);
    
            let itemsInCart =  Number(itemsQuantity.innerText);
            let totalInCart =  Number(total.innerText);

            let number = parseInt(productQuantity.value);   

            itemsInCart = itemsInCart - number; 
            totalInCart = totalInCart - (price*number);

            //Update producto en carrito
            let productCart = {};
            productCart.id = productCartId;


            //Actualizar en shoppingCartProducts
            fetch(location.origin + '/api/carrito-compras-producto/',
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(productCart)
                }
            )
                .then(response => response.json())
                .then(data => {
                    console.log("producto actualizado en carrito");
                    console.log(data);

                    //update cart
                    console.log("Actualizando carrito " + cartId)
                    //console.log(cartFound)
                    let cartFound = {}
                    cartFound.totalPrice = totalInCart;
                    cartFound.itemsQuantity = itemsInCart;
                    cartFound.id = cartId

                    console.log("Actualizando carrito despues ")
                    console.log(cartFound)
                    fetch(location.origin + '/api/carrito-compras/',
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: JSON.stringify(cartFound)
                        }
                    )
                        .then(response => response.json())
                        .then(data => {
                            console.log("carrito actualizado: " + cartFound.id);
                            console.log(data);

                             beforeTaxShoppingCart.innerText  = "$ " + new Intl.NumberFormat("es-CO").format(totalInCart - (totalInCart*0.19))

                             taxShoppingCart.innerText  ="$ " + new Intl.NumberFormat("es-CO").format(totalInCart*0.19)

                             totalShoppingCart.innerText  = "$ " + new Intl.NumberFormat("es-CO").format(totalInCart)

                              itemsQuantity.innerText = itemsInCart
                              total.innerText = totalInCart

                              productArticle.remove()

                        });

                });




        
            return false;
        })


        
    })




    erase2.forEach(function (currentBtn) {
        let cartId = Number(currentBtn.dataset.cartid);
        let productCartId = Number(currentBtn.dataset.id);
        let price = Number(currentBtn.dataset.price);

        currentBtn.addEventListener("click", function (e) {

            e.stopPropagation();

            const productQuantity = document.querySelector('#productQuantity-'+productCartId);
            const itemsQuantity = document.querySelector('.itemsQuantityHide');
            const total = document.querySelector('.totalHide');
            const productArticle = document.querySelector('#product-'+productCartId);

    
            let itemsInCart =  Number(itemsQuantity.innerText);
            let totalInCart =  Number(total.innerText);

            let number = parseInt(productQuantity.value);   

            itemsInCart = itemsInCart - number; 
            totalInCart = totalInCart - (price*number);

            //Update producto en carrito
            let productCart = {};
            productCart.id = productCartId;


            //Actualizar en shoppingCartProducts
            fetch(location.origin + '/api/carrito-compras-producto/',
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(productCart)
                }
            )
                .then(response => response.json())
                .then(data => {
                    console.log("producto actualizado en carrito");
                    console.log(data);

                    //update cart
                    console.log("Actualizando carrito " + cartId)
                    //console.log(cartFound)
                    let cartFound = {}
                    cartFound.totalPrice = totalInCart;
                    cartFound.itemsQuantity = itemsInCart;
                    cartFound.id = cartId

                    console.log("Actualizando carrito despues ")
                    console.log(cartFound)
                    fetch(location.origin + '/api/carrito-compras/',
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: JSON.stringify(cartFound)
                        }
                    )
                        .then(response => response.json())
                        .then(data => {
                            console.log("carrito actualizado: " + cartFound.id);
                            console.log(data);

                             beforeTaxShoppingCart.innerText  = "$ " + new Intl.NumberFormat("es-CO").format(totalInCart - (totalInCart*0.19))

                             taxShoppingCart.innerText  ="$ " + new Intl.NumberFormat("es-CO").format(totalInCart*0.19)

                             totalShoppingCart.innerText  = "$ " + new Intl.NumberFormat("es-CO").format(totalInCart)

                              itemsQuantity.innerText = itemsInCart
                              total.innerText = totalInCart
                              productArticle.remove()

                        });

                });




        
            return false;
        })


        
    })



})