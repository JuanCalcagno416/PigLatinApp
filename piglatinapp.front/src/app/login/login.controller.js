export class LoginController {
    constructor (toastr, RegisterService,TokenService,$state) {
      'ngInject';
  
      this.toastr = toastr;
      this.registerService = RegisterService;
      this.tokenService = TokenService;
      this.state = $state;
    }

    access () {
          
        this.registerService.accessUser(this.user).then((response)=> {
        
              
              
              

            this.tokenService.set(response.data.token)
            this.showToastr();
            this.state.go('app.translate')

          })


    }

    showToastr() {
      this.toastr.success("You've logged in");
      this.classAnimation = '';
    }
  
    // register(){
    //   var user = {};
      
    //   this.translateService.createUser(this.user).then((response)=> {
        
    //       
    //       
    //       
        
    //     // response.data.forEach(element => {
    //     //     
    //     // });

    //   })
    // }

  }
