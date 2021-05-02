// Abre el menu en responsive
const bodySelector = document.body;
const navbar = document.querySelector('.sideMenu');
const menuToggle = document.querySelector('.triggerMenu');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
        menuToggle.classList.toggle('toggled');
        bodySelector.classList.toggle('fixed');
    });
}

// Agrega la clase .menuActive en Tablet y Desktop

document.addEventListener('click', function (event) {
    const categoriesAnchor = document.querySelector('.categoriesLink');
    const toggleMenu = document.querySelector('.sideMenu');
    let isClickeableInside = categoriesAnchor.contains(event.target);

    if(isClickeableInside) {
        toggleMenu.classList.toggle('menuActive');
    } else {
        toggleMenu.classList.remove('menuActive');
    }
})


// Para revelar La contraseña en el ojito

const togglePassword = document.querySelector('.togglePassword');
const password = document.querySelector('#password');

if(togglePassword) {
    togglePassword.addEventListener('click', function(event){
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        togglePassword.classList.toggle('icon-eyeClose');
    })
}


// Abrir menu de usuario
document.addEventListener('click', function (event) {
const userMenuTrigger = document.querySelector('.userAccount');
const userMenu = document.querySelector('#userMenu');
let isClickeableInside = userMenuTrigger.contains(event.target);

if(isClickeableInside) {
    userMenu.classList.toggle('userMenuActive');
} else {
    userMenu.classList.remove('userMenuActive');
}

})