(function () {
    "use strict";

    angular.module('todoApp')
        .factory('userService', userService);

    userService.$inject = ['$http', 'constantes', 'helperFactory'];

    function userService($http, constantes, helper) {
        var vm = this;
        vm.BASE_URL = constantes.BASE_URL;

        return {
            getUsers: _getUsers,
            getRoles: _getRoles
        }

        // ======================================

        function _getUsers(fn, fnError) {
            return $http.get(`${vm.BASE_URL}/user`)
                .then(function (response) {
                    fn(response.data);
                })
                .catch(function (error) {
                    fnError ? fnError(error) : console.log(error);
                });
        }

        function _getRoles(fn, fnError) {
            return $http.get(`${vm.BASE_URL}/user/roles`)
                .then(function (response) {
                    fn(response.data)
                })
                .catch(function (error) {
                    fnError ? fnError(error) : console.log(error);
                });
        }

    }


})();