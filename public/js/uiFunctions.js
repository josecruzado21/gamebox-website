// Abre el menu en responsive
const bodySelector = document.body;
const navbar = document.querySelector('.sideMenu');
const menuToggle = document.querySelector('.triggerMenu');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
    menuToggle.classList.toggle('toggled');
    bodySelector.classList.toggle('fixed');
});

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
