'use strict';

(function () {
    function init() {
        new Router([
            new Route('catalog', 'catalog.html', 'catalog.js', true),            
            new Route('favourite', 'favourite.html', 'favourite.js')
        ]);
    }
    init();
}());
