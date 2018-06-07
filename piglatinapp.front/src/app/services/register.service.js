export class RegisterService {
    constructor ($log, $http) {
      'ngInject';
  
      this.$log = $log;
      this.$http = $http;
      this.apiCreateUser= 'http://localhost:8080/api/users';
      this.apiAccessUser= 'http://localhost:8080/api/login';

    }
  
    createUser(user) {
      return this.$http.post(this.apiCreateUser,user)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
    }

    accessUser(user) {
      return this.$http.post(this.apiAccessUser,user)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error
        })
    }
}