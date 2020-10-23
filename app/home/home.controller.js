(function () {
    "use strict";

    angular.module('todoApp')
        .controller('homeController', homeController);

    homeController.$inject = ['helperFactory', 'todoService'];

    function homeController(helper, service) {
        var vm = this;
        vm.teste = 'Mensagem teste'
        /* ***************    INIT VARIÁVEIS    *********************************** */

        /* ***************    FUNÇÕES EXECUTADAS NA VIEW (HMTL)    **************** */

        /* ***************    FUNÇÕES INTERNAS    ******************************** */

    }

})();