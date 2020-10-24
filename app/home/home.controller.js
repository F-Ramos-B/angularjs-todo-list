(function () {
  'use strict';

  angular.module('todoApp')
    .controller('homeController', homeController);

  homeController.$inject = ['constantes', 'todoService', '$timeout'];

  function homeController(constantes, service, $timeout) {
    var vm = this;
    /* ***************    INIT VARIÁVEIS    *********************************** */
    vm.teste = 'Testando';
    vm.cards = [];

    /* ***************    INDICE FUNÇÕES    **************** */
    vm.init = init;
    vm.criarCards = criarCards;
    vm.dragEvent = dragEvent;
    vm.drop = drop;
    vm.allowDrop = allowDrop;
    vm.loading = true;

    /* ***************    FUNÇÕES INTERNAS    ******************************** */

    function init() {
      vm.criarCards();
      $timeout(() => {
        console.log('timeout');
        vm.loading = false;
      }, 2000);
    }

    function criarCards() {
      vm.cards = [
        {
          idStatus: 1,
          status: 'TODO',
          severity: 'info',
          registros: [
            {
              id: 1,
              text: 'Prova Quarkus'
            }
          ]
        },
        {
          idStatus: 2,
          status: 'DOING',
          severity: 'warning',
          registros: [
            {
              id: 2,
              text: 'Estudando'
            },
            {
              id: 3,
              text: 'Fazendo front-end'
            },
          ]
        },
        {
          idStatus: 3,
          status: 'DONE',
          severity: 'success',
          registros: [
            {
              id: 4,
              text: 'Prova AngularJS'
            },
            {
              id: 5,
              text: 'Prova Java'
            },
          ]
        },
        {
          idStatus: 4,
          status: 'BLOCK',
          severity: 'danger',
          registros: [
            {
              id: 6,
              text: 'Fazer fork no projeto final'
            }
          ]
        }
      ];
    }

    function dragEvent(event, sourceCard, value) {
      console.log('source:', sourceCard);
      console.log('valor source:', value);
      event.dataTransfer.setData('dragged', JSON.stringify(value));
    }

    function drop(event, targetCard) {
      console.log('target:', targetCard);
      var data = JSON.parse(event.dataTransfer.getData('dragged'));
      console.log('valor target:', data);
    }

    function allowDrop(event) {
      event.preventDefault();
    }
  }

})();