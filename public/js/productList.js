const addToCartButtons = document.querySelectorAll('.button-list');
const cartCount = document.querySelector('#cartCount');

let cart = {}
let cartFound = {}
//let productList = []

var cookieArr = document.cookie.split(";");

console.log("cookies");
console.log(cookieArr);

addToCartButtons.forEach(function(currentBtn){
    currentBtn.addEventListener("click", function(e){
        e.stopPropagation();
        
        console.log("user");
        console.log(currentBtn.dataset.userid);

        if(currentBtn.dataset.userid == null ||  currentBtn.dataset.userid == undefined || currentBtn.dataset.userid == ''){
            window.location.replace(location.origin+'/login');
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

        console.log("producto a añadir");
        console.log(productToAdd);

        console.log('Buscando carrito... ');
        //Buscar carrito creado, sino se encuentra se debe crear
        fetch(location.origin+'/api/carrito-compras/' + '?'+ 'userId=' + userId + '&' + 'status=1')
        .then(response => response.json())
        .then(data => {

           
            console.log('Carrito encontrado: ');
            cartFound = data;

            console.log(cartFound);

            //No Existe carrito  
            if(cartFound == null){
                    console.log("No Existe carrito")
                    //Crear carrito
                    cart.userId = userId;
                    cart.totalPrice = productToAdd.price;
                    cart.itemsQuantity = productToAdd.quantity;
                    cart.shoppingCartStatus = 1

                    fetch(location.origin+'/api/carrito-compras/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify(cart)
                    }

                )
                .then(response => response.json())
                .then(data => {
                                console.log("Data carrito creado: ");
                                console.log(data);
                                
                                let product = {};
                                product.product = Number(productToAdd.id) ;
                                product.shoppingCart = Number(data.id) ;
                                product.hasEdition = Number(productToAdd.hasEdition)  ;
                                product.edition = productToAdd.edition;
                                product.image = productToAdd.image;
                                product.quantity = productToAdd.quantity;
                                product.price = productToAdd.price;
                                product.category = productToAdd.category;
                                // //Crea productos en carrito
                                console.log("Creando productos en carrito: ");

                                fetch(location.origin+'/api/carrito-compras-producto/',
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                        // 'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                    body: JSON.stringify(product)
                                }
                                )
                                .then(response => response.json())
                                .then(data => {
                                    console.log("producto creado en carrito: ");
                                    console.log(data);

                                });

                });


            //Existe carrito
            }else{
            console.log("Existe carrito!")
            console.log(JSON.stringify(cartFound))
            let productsFound =  cartFound.shoppingCartShoppingCartProducts;
            console.log("Productos Encontrados: " +  JSON.stringify(productsFound) )
            //Si tiene productos
            if(productsFound.length >0){

                let totalPrice = Number(productToAdd.price);
                let totalItems = Number(productToAdd.quantity);

                console.log("Total price inicial: " + totalPrice)
                console.log("Total items inicial: " + totalItems)

                console.log("ProductoAdd :" + productToAdd.id);
                console.log(productsFound.filter(e => e.product == productToAdd.id));
                
                let pFound = productsFound.filter(e => e.product == productToAdd.id);
                //Producto existe en carrito
                if(pFound.length > 0){
                    
                        let pf = pFound[0];

                        console.log("Producto encontrado");
                        console.log(pf);

                        //Update producto en carrito
                        let productCart = {};
                        productCart.quantity = pf.quantity + productToAdd.quantity;
                        productCart.id = pf.id;
                    
                        console.log("Total price iteracion: " + totalPrice)
                        console.log("Total items iteracion: " + totalItems)
                      
                        //Guardar cada producto en shoppingCartProducts
                         console.log("Actualizando producto " + productToAdd.id)
                         console.log(productCart)
                         fetch(location.origin+'/api/carrito-compras-producto/',
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

                             console.log("Total price: " + totalPrice)
                             console.log("Total items: " + totalItems)
                             
                             //update cart
                             console.log("Actualizando carrito " + cartFound.id)
                             console.log(cartFound)
             
                             cartFound.totalPrice = totalPrice + Number(cartFound.totalPrice);
                             cartFound.itemsQuantity = totalItems +  Number(cartFound.itemsQuantity);
             
                             console.log("Actualizando carrito despues ") 
                             console.log(cartFound)
                             fetch(location.origin+'/api/carrito-compras/',
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
             
                             });
     
                         });


               //Producto no existe en carrito
                }else{

                    console.log("Producto no existe en carrito");
                    let product = {};
                    product.product = Number(productToAdd.id) ;
                    product.shoppingCart = Number(cartFound.id) ;
                    product.hasEdition = Number(productToAdd.hasEdition)  ;
                    product.edition = productToAdd.edition;
                    product.image = productToAdd.image;
                    product.quantity = productToAdd.quantity;
                    product.price = productToAdd.price;

                    //Guardar cada producto en shoppingCartProducts
                    console.log("Guardando producto " + product.product)
                    console.log(product)
                    fetch(location.origin+'/api/carrito-compras-producto/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify(product)
                    }
                    )
                    .then(response => response.json())
                    .then(data => {

                        //update cart
                        console.log("Actualizando carrito antes" + cartFound.id)
                        console.log(cartFound)
        
                        cartFound.totalPrice = Number(cartFound.totalPrice) + Number(product.price);
                        cartFound.itemsQuantity =  Number(cartFound.itemsQuantity)+Number(product.quantity);
        
                        console.log("Actualizando carrito despues ") 
                        console.log(cartFound)
                        fetch(location.origin+'/api/carrito-compras/',
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
        
                        });


                    });

                }

            //Si NO tiene productos
            }else{
                console.log("No tiene productos ")
             

                    let product = {};
                    product.product = Number(productToAdd.id) ;
                    product.shoppingCart = Number(cartFound.id) ;
                    product.hasEdition = Number(productToAdd.hasEdition)  ;
                    product.edition = productToAdd.edition;
                    product.image = productToAdd.image;
                    product.quantity = productToAdd.quantity;
                    product.price = productToAdd.price;


                    //Guardar cada producto en shoppingCartProducts
                    console.log("Guardando producto " + product.product)
                    console.log(product)
                    fetch(location.origin+'/api/carrito-compras-producto/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify(product)
                    }
                    )
                    .then(response => response.json())
                    .then(data => {
                        console.log("respuesta producto guardado " )
                        console.log(data);

                    });

             

            }


         }



        });




        //localStorage.setItem('productList', JSON.stringify(productList))
    })

  })
