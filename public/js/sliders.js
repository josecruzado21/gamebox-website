window.addEventListener('load', function () {
    // SLider Hero 
    if (document.querySelector('.glideHeroHome')) {
        new Glide('.glideHeroHome', {
            activeNav: 'glide__bullet--active',
            autoplay: 4000,
            hoverpause: false
        }).mount()
    }
});