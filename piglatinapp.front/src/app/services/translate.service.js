export class TranslateService {
    constructor ($log, $http) {
      'ngInject';
  
      this.$log = $log;
      this.$http = $http;
      this.apiPostTranslation= 'http://localhost:8080/api/translate';
      this.apiGetTranslations= 'http://localhost:8080/api/translations';

    }
  
    postTranslation(toTranslate) {
      return this.$http.post(this.apiPostTranslation,toTranslate)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
    }
    
    getUserTranslations() {
        return this.$http.get(this.apiGetTranslations)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error;
          });
      }
}