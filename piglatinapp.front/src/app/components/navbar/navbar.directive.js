export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
        creationDate: '='
    },
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class NavbarController {
  constructor (moment, $state,TokenService) {
    'ngInject';
    this.state = $state;
    this.tokenService = TokenService;
    this.relativeDate = moment(this.creationDate).fromNow();
  }

  logout() {
    this.tokenService.remove();
    this.state.go('app.login');
  }

}
