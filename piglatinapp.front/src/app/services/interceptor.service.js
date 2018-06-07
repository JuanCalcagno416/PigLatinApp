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
    console.log('haciendo request');

        if (self.tokenService.has()){
            console.log('toy n if')
            console.log(self.tokenService.get());
        config.headers['X-TOKEN'] = self.tokenService.get();

        }
    return config;
    }
}