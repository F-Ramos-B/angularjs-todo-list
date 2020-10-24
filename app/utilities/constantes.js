(function () {
  "use strict";

  angular.module('todoApp')
    .constant('constantes', {
      BASE_URL: 'http://localhost:8080/api',
      ROLES: {
        ADMIN: {
          id: 1,
          role: 'ADMIN'
        },
        USER: {
          id: 2,
          role: 'USER'
        }
      }
    });

})();