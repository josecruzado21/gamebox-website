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

function menuActive() {
    const toggleMenu = document.querySelector('.sideMenu');
    toggleMenu.classList.toggle('menuActive');
}