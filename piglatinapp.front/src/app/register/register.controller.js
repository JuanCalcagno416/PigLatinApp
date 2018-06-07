export class RegisterController {
    constructor (toastr, RegisterService) {
      'ngInject';
  
      this.toastr = toastr;
      this.registerService = RegisterService;

    }

  
    register(){
      var user = {};
      
      this.registerService.createUser(this.user).then((response)=> {
        
        console.log("creating user");
        console.log(this.user);
        console.log(response);
        
        // response.data.forEach(element => {
        //   console.log(element);
        // });

      })
    }

  }
