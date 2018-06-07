export class TranslateController {
    constructor (toastr, TranslateService) {
      'ngInject';
  
      this.toastr = toastr;
      this.translateService = TranslateService;
      this.newTranslation = {};
      this.myTranslations = [];
          
    }

    translate() {
      var translation = {
          text:this.translation.text
      };
  
          this.translateService.postTranslation(translation)    
            .then((response) => {
                
              this.newTranslation.oldText = response.data.oldText;
              this.newTranslation.newText = response.data.newText;
            })         

    }

    getMyTranslations() {
          
      this.translateService.getUserTranslations()    
        .then((response) => {
              
            // response.data.data.map((item) => {
                   this.myTranslations = response.data;
            // }) 
            
              

        })      
      
    }

    hideMyTranslations() {
      this.myTranslations = 0;
    }

  }
