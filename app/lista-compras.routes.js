(function () {
    "use strict";

    angular.module('listaComprasApp')
        .config(routes)
        .run(configDefaults);

    routes.$inject = ['$routeProvider'];
    configDefaults.$inject = ['$rootScope'];

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/login'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }

    function configDefaults($rootScope) {
        $rootScope.listaMensagens = [];
    }

})();