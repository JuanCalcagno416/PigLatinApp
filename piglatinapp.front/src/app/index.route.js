export function routerConfig ($stateProvider, $urlRouterProvider,$injector) {
  'ngInject';
  $stateProvider
    .state('app', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      abstract: true,
      url: "/"
    })
    .state('app.home', {
      url: 'home',
      controller: 'HomeController',
      controllerAs: 'home',
      templateUrl: 'app/home/home.html'
    })
    .state('app.register', {
      url: 'register',
      controller: 'RegisterController',
      controllerAs: 'register',
      templateUrl: 'app/register/register.html'
    })
    .state('app.login', {
      url: 'login',
      controller: 'LoginController',
      controllerAs: 'login',
      templateUrl: 'app/login/login.html'
    })
   .state('app.translate', {
      url: 'translate',
      templateUrl: 'app/translate/translate.html',
      controller: 'TranslateController',
      controllerAs: 'translate',
      resolve: {
        security: function($q, $injector){
          console.log('AJAASD MAMAGUEVO')
          if (!$injector.get('TokenService').has()) {
            return $q.reject('NotAuthorized');
          }
        }
      }
    })
  $urlRouterProvider.otherwise('/home');
}
