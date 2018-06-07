export class TokenService {
        constructor ($window) {
          'ngInject';
          this.window = $window;
        }
      
    set (token) {
			window.sessionStorage.setItem('X-TOKEN',token);
		};

		get () {
			return window.sessionStorage.getItem('X-TOKEN');
		};

		has () {
			return !!window.sessionStorage.getItem('X-TOKEN');
		}
}