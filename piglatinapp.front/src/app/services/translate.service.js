export class TranslateService {
    constructor ($log, $http) {
      'ngInject';
  
      this.$log = $log;
      this.$http = $http;
      this.apiPostTranslation= 'http://localhost:8080/api/translate';
      this.apiPostTranslation= 'http://localhost:8080/api/translations';

    }
  
    postTranslation(user) {
      return this.$http.post(this.apiCreateUser,user)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
    }
    
    getUserTranslations(user) {
        return this.$http.post(this.apiCreateUser,user)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error;
          });
      }
}