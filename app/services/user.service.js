(function () {
  "use strict";

  angular.module('todoApp')
    .factory('userService', userService);

  userService.$inject = ['$http', 'constantes', 'helperFactory'];

  function userService($http, constantes, helper) {
    var vm = this;
    vm.BASE_URL = constantes.BASE_URL;
    vm._getCallbackError = _getCallbackError;

    return {
      getUsers: _getUsers,
      getRoles: _getRoles,
      criarUsuario: _criarUsuario,
      consultarPaginado: _consultarPaginado,
      editarUsuario: _editarUsuario,
      excluirUsuario: _excluirUsuario
    }

    // ======================================

    function _getUsers(cb, cbError) {
      return $http.get(`${vm.BASE_URL}/user`).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _getRoles(cb, cbError) {
      return $http.get(`${vm.BASE_URL}/user/roles`).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _criarUsuario(usuario, usuarioSelecionado, cb, cbError) {
      var headers = helper.codificarAutenticacao(usuarioSelecionado);
      return $http.post(`${vm.BASE_URL}/user`, usuario, { headers }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _editarUsuario(usuario, usuarioSelecionado, cb, cbError) {
      var headers = helper.codificarAutenticacao(usuarioSelecionado);
      return $http.put(`${vm.BASE_URL}/user`, usuario, { headers }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _consultarPaginado(filtro, cb, cbError) {
      return $http.get(`${vm.BASE_URL}/user/paginado`, { params: filtro }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _excluirUsuario(id, usuarioSelecionado, cb, cbError) {
      var headers = helper.codificarAutenticacao(usuarioSelecionado);
      return $http.delete(`${vm.BASE_URL}/user/${id}`, { headers }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _getCallbackError(cbError) {
      return cbError || constantes.CALLBACK_ERROR;
    }

  }


})();