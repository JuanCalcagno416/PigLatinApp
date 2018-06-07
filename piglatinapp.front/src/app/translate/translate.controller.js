export class TranslateController {
    constructor (toastr, TranslateService) {
      'ngInject';
  
      this.toastr = toastr;
      this.translateService = TranslateService;

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
