(function () {
  "use strict";

  angular.module('todoApp')
    .factory('helperFactory', helperFactory);

  helperFactory.$inject = [];

  function helperFactory() {

    return {
      codificarAutenticacao: _codificarAutenticacao
    }

    function _codificarAutenticacao(usuarioSelecionado) {
      return {
        'Authorization': 'Basic ' + btoa(usuarioSelecionado.email + ':' + usuarioSelecionado.senha)
      };
    }

  }

})();