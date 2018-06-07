export class LoginController {
    constructor (toastr, RegisterService,TokenService) {
      'ngInject';
  
      this.toastr = toastr;
      this.registerService = RegisterService;
      this.tokenService = TokenService;

    }

    access () {
        console.log('controller - logeando')
        this.registerService.accessUser(this.user).then((response)=> {
        
            console.log("login user");
            console.log(this.user);
            console.log(response.data.token);

            this.tokenService.set(response.data.token)

          })
    }

  
    // register(){
    //   var user = {};
      
    //   this.translateService.createUser(this.user).then((response)=> {
        
    //     console.log("creating user");
    //     console.log(this.user);
    //     console.log(response);
        
    //     // response.data.forEach(element => {
    //     //   console.log(element);
    //     // });

    //   })
    // }

  }
