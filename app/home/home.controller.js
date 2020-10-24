(function () {
  'use strict';

  angular.module('todoApp')
    .controller('homeController', homeController);

  homeController.$inject = ['constantes', 'userService'];

  function homeController(constantes, userService) {
    var vm = this;

    /* ***************    INIT VARIÁVEIS    *********************************** */
    vm.loading = true;
    vm.cards = [];
    vm.users = [];
    vm.permissoes = [];
    vm.usuario = {};
    vm.usuarioSelecionado = null;
    vm.constantes = constantes;
    vm.isEdicao = false;
    vm.paginador = {
      filtro: { pageNumber: 0, pageSize: 10 },
      total: 1,
      paginas: 1,
      resultados: [],
      loading: false
    }

    /* ***************    INDICE FUNÇÕES    **************** */
    vm.init = init;
    vm.criarCards = criarCards;
    vm.dragEvent = dragEvent;
    vm.drop = drop;
    vm.allowDrop = allowDrop;
    vm.buscarUsuarios = buscarUsuarios;
    vm.submit = submit;
    vm.clearUsuario = clearUsuario;
    vm.buscarRoles = buscarRoles;
    vm.consultarPaginado = consultarPaginado;
    vm.paginar = paginar;
    vm.paginaAnterior = paginaAnterior;
    vm.proximaPagina = proximaPagina;
    vm.excluirUsuario = excluirUsuario;
    vm.prepararEdicao = prepararEdicao;

    /* ***************    FUNÇÕES    ******************************** */

    function init() {
      $('#novoUserModal').on('hidden.bs.modal', vm.clearUsuario);
      vm.buscarUsuarios();
      vm.criarCards();
      vm.buscarRoles();
      vm.consultarPaginado();
    }

    function consultarPaginado() {
      vm.paginador.loading = true;
      userService.consultarPaginado(vm.paginador.filtro, ({ data }) => {
        vm.paginador.resultados = data.lista;
        vm.paginador.paginas = data.paginas;
        vm.paginador.total = data.total;
        vm.paginador.loading = false;
      });
    }

    function paginar(index) {
      vm.paginador.filtro.pageNumber = index;
      vm.consultarPaginado();
    }

    function paginaAnterior() {
      vm.paginador.filtro.pageNumber--;
      vm.consultarPaginado();
    }

    function proximaPagina() {
      vm.paginador.filtro.pageNumber++;
      vm.consultarPaginado();
    }

    function submit() {
      var fn = vm.isEdicao ? userService.editarUsuario : userService.criarUsuario;

      fn(vm.usuario, vm.usuarioSelecionado, () => {
        vm.buscarUsuarios();

        vm.isEdicao = false;
        vm.clearUsuario();
        vm.consultarPaginado();
        $('#novoUserModal').modal('hide');
        $('#tableModal').modal('show');
      });
    }

    function prepararEdicao(usuario) {
      vm.isEdicao = true;
      vm.usuario = { ...usuario };
    }

    function clearUsuario() {
      vm.usuario = {};
    }

    function buscarUsuarios() {
      userService.getUsers(({ data }) => {
        vm.users = data;
        if (vm.usuarioSelecionado) {
          vm.usuarioSelecionado = vm.users.find(u => u.id === vm.usuarioSelecionado.id);
        } else {
          vm.usuarioSelecionado = data[0];
        }
      });
    }

    function excluirUsuario(id) {
      userService.excluirUsuario(id, vm.usuarioSelecionado, () => {
        vm.consultarPaginado();
      });
    }

    function buscarRoles() {
      userService.getRoles(({ data }) => {
        vm.permissoes = data;
      });
    }

    function criarCards() {
      vm.cards = [{
          idStatus: 1,
          status: 'TODO',
          severity: 'info',
          registros: [{
            id: 1,
            text: 'Prova Quarkus'
          }]
        },
        {
          idStatus: 2,
          status: 'DOING',
          severity: 'warning',
          registros: [{
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
          registros: [{
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
          registros: [{
            id: 6,
            text: 'Fazer fork no projeto final'
          }]
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