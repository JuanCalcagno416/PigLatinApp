export function runBlock ($log,$injector,$rootScope,$state) {
  'ngInject';
  $log.debug('runBlock end');
  const TokenService = $injector.get('TokenService');
   $rootScope
    .$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      
      if (angular.isString(error)) {
      event.preventDefault();
      switch (error) {
        case 'NotAuthorized':
        $state.go('app.home');
        break;
        case 'NotAnon':
        $state.go('app.home');
        break;
        case 'UserAlreadyConfirm':
        $state.go('app.home');
        break;
    }
  }
    })
    
}
