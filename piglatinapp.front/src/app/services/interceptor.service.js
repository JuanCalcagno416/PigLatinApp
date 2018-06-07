let self
export class InterceptorService {
    
    constructor (TokenService) {
    'ngInject';
        this.tokenService = TokenService;
        self = this;
    }
    
    request(config) {
    config.headers = config.headers || {};
    config.headers['Accept'] = 'application/json';
      

        if (self.tokenService.has()){
              
              
        config.headers['X-TOKEN'] = self.tokenService.get();

        }
    return config;
    }
}