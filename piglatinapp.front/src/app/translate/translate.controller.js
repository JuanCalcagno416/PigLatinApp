export class TranslateController {
    constructor (toastr, TranslateService) {
      'ngInject';
  
      this.toastr = toastr;
      this.translateService = TranslateService;
      this.newTranslation = {};
      this.myTranslations = [];
        console.log(this.myTranslations.length)
    }

    translate() {
      var translation = {
          text:this.translation.text
      };
  
          this.translateService.postTranslation(translation)    
            .then((response) => {
              console.log(response.data)
              this.newTranslation.oldText = response.data.oldText;
              this.newTranslation.newText = response.data.newText;
            })         

    }

    getMyTranslations() {
        console.log('get my translate')
      this.translateService.getUserTranslations()    
        .then((response) => {
            console.log(response.data)
            // response.data.data.map((item) => {
                   this.myTranslations = response.data;
            // }) 
            
            console.log(this.myTranslations)

        })      
      
    }

    hideMyTranslations() {
      this.myTranslations = 0;
      console.log(this.myTranslations.length)
    }

  }
