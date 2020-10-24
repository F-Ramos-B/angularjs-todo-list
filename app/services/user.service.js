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
      getRoles: _getRoles,
      criarUsuario: _criarUsuario,
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
          fn(response.data);
        })
        .catch(function (error) {
          fnError ? fnError(error) : console.log(error);
        });
    }

    function _criarUsuario(usuario, usuarioSelecionado, fn, fnError) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa(usuarioSelecionado.email + ':' + usuarioSelecionado.senha);

      return $http.post(`${vm.BASE_URL}/user`, usuario)
        .then(function (response) {
          fn(response.data);
        })
        .catch(function (error) {
          fnError ? fnError(error) : console.log(error);
        });
    }

  }


})();