(function () {
    "use strict";

    angular.module('todoApp')
        .service('todoService', todoService);

    todoService.$inject = ['$http', 'constantes', 'helperFactory'];

    function todoService($http, constantes, helper) {
        // this.name = name;

        // function name(params) {
        //     // implementar
        // }

        return {
            exemplo: exemplo
        }

        // ======================================

        function exemplo() {
            return $http.get('http://worldclockapi.com/api/json/est/now')
                .then(function (response) {
                    return response.data;
                })
                .catch(helper.sendError);
        }

    }


})();