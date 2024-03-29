window.addEventListener('load', function () {
    // Abre el menu en responsive
    const bodySelector = document.body;
    const navbar = document.querySelector('.sideMenu');
    const menuToggle = document.querySelector('.triggerMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('open');
            menuToggle.classList.toggle('toggled');
            bodySelector.classList.toggle('fixed');
        });
    }

    // Agrega la clase .menuActive en Tablet y Desktop
    const categoriesAnchor = document.querySelector('.categoriesLink');
    const toggleMenu = document.querySelector('.sideMenu');

    if (toggleMenu) {
        document.addEventListener('click', function (event) {
            let isClickeableInside = categoriesAnchor.contains(event.target);

            if (isClickeableInside) {
                toggleMenu.classList.toggle('menuActive');
            } else {
                toggleMenu.classList.remove('menuActive');
            }
        })
    }


    // Para revelar La contraseña en el ojito

    const togglePassword = document.querySelector('.togglePassword');
    const password = document.querySelector('#password');

    if (togglePassword) {
        togglePassword.addEventListener('click', function (event) {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            togglePassword.classList.toggle('icon-eyeClose');
        })
    }

    // Abrir menu de usuario
    const userMenuTrigger = document.querySelector('.userAccount');
    const userMenu = document.querySelector('#userMenu');

    if (userMenu) {
        document.addEventListener('click', function (event) {
            let isClickeableInside = userMenuTrigger.contains(event.target);

            if (isClickeableInside) {
                userMenu.classList.toggle('userMenuActive');
            } else {
                userMenu.classList.remove('userMenuActive');
            }
        })
    }

    const formRegister = document.querySelector('#formRegister');

    if (formRegister) {
        let loader = function(e){
            let file = e.target.files;
            let show = "<span>Archivo seleccionado: </span>" + file[0].name;
        
            let output = document.getElementById('btnLabel');
            output.innerHTML = show;
            output.classList.add('active');
        }

        let fileInput = document.getElementById('image');
        fileInput.addEventListener('change', loader);
    }
})