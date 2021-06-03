window.addEventListener('load', function () {
    // SLider Hero 
    if (document.querySelector('.glideHeroHome')) {
        new Glide('.glideHeroHome', {
            activeNav: 'glide__bullet--active',
            autoplay: 4000,
            hoverpause: false
        }).mount()
    }

    if (document.querySelector('.glideNewProducts')) {
        new Glide('.glideNewProducts', {
            type: 'carousel',
            startAt: 0,
            perView: 4,
            gap: 16,
            touchRatio: 1,
            breakpoints: {
                990: {
                    perView: 3
                },
                600: {
                    perView: 1
                }
            }
        }).mount()
    }
});