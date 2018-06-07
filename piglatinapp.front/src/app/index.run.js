export function runBlock ($log,$injector,$rootScope,$state) {
  'ngInject';
  $log.debug('runBlock end');
  const TokenService = $injector.get('TokenService');
 
  console.log($rootScope.$on)
  $rootScope
    .$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      
      if (angular.isString(error)) {
      event.preventDefault();
      switch (error) {
        case 'NotAuthorized':
        $state.go('home');
        break;
        case 'NotAnon':
        $state.go('home');
        break;
        case 'UserAlreadyConfirm':
        $state.go('home');
        break;
    }
  }
    })
    
}
