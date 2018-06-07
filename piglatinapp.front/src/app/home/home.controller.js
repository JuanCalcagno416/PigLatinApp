export class HomeController {
    constructor (toastr) {
      'ngInject';
  
      this.toastr = toastr;
    }

  
    greet(){
      console.log("hola en home");
    }

  }
