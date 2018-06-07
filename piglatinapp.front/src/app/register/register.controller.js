export class RegisterController {
    constructor (toastr, RegisterService,$state) {
      'ngInject';
  
      this.toastr = toastr;
      this.registerService = RegisterService;
      this.state = $state;

    }

  
    register(){
      var user = {};
      
      this.registerService.createUser(this.user).then((response)=> {
          this.state.go('app.translate')
          this.showToastr();

      })
    }

    showToastr() {
       this.toastr.success("Success creating the account.")
       this.classAnimation = '';
    }

  }
