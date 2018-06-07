import mongoose     from 'mongoose'

const TranslationSchema = new mongoose.Schema({
    oldText:    {type:String},
    newText:    {type:String},
    user_id:     {type:mongoose.Schema.ObjectId,ref:'User'},

    created_at: {
        type:Date,
        default:Date.now
    }
}) 

TranslationSchema.statics = { 

    translateWord: (textToTranslate,user,cb) => {

          
        if(textToTranslate == "" || /\s/g.test(textToTranslate) && textToTranslate == "") {
            cb(null,{"error":"You cannot leave this in blank"});
        }else {
            if (/\s/.test(textToTranslate)) {
                var splitSentence = textToTranslate.split(" ");
                // DELETE WHITESPACE IN ARRAY
                splitSentence = splitSentence.filter(function(str) {
                    return /\S/.test(str);
                });               
                 
                // ONE WORD WITH WHITESPACES 
                if(splitSentence.indexOf(textToTranslate.replace(/\s+/g,'')) > -1){
   
                        Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,user,cb});

                }else {
                    Translation.checkLetters(textToTranslate.toLowerCase(),{splitSentence,user,cb});
                }
                // WORD WITHOUT SPACE
            }else {
            
                if (/(\w-\w)/g.test(textToTranslate)){
                    var hyphen = true;
                    splitSentence = textToTranslate.split("-"); 
                    Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,hyphen,user,cb});
                }else{
                    Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,hyphen,user,cb});
                }
            }
        }
    },


    checkLetters: (textToTranslate,{splitSentence,hyphen,user,cb}) => {
        var finalWords = [];
        // If its a sentence 
        if(splitSentence != undefined) {
            var newSplitSentence = [];
            var hyphenwords = [];
            var indexOfHypenWords = []
            var i = 0
            // CHECKING HYPHEN IN ARRAY AND MAKING NEW ARRAY OF WORDS
            while(i<splitSentence.length) {
                if(/(\w-\w)/g.test(splitSentence[i])) {
                    hyphenwords = splitSentence[i].split('-')
                    var hyphen = true;
                    indexOfHypenWords.push(i)
                    for(var y = 0;y<hyphenwords.length;y++){
                        newSplitSentence.push(hyphenwords[y])
                    }

                    i++
                }else {
                    newSplitSentence.push(splitSentence[i])
                    i++
                }
            }


            // CHECKING FOR FIRST LETTER IN WORDS 
            for(var x = 0;x<newSplitSentence.length;x++){
                if(['a','e','i','o','u'].includes(newSplitSentence[x].toLowerCase().charAt(0))){
                    Translation.vocalMethod(newSplitSentence[x],{newSplitSentence,finalWords,hyphen,indexOfHypenWords,user,cb})
                }else {

                    Translation.consonantMethod(newSplitSentence[x],{newSplitSentence,finalWords,hyphen,indexOfHypenWords,user,cb})
                }
                
            }
        // If its a word
        }else {

            if(['a','e','i','o','u'].includes(textToTranslate.charAt(0))){
                Translation.vocalMethod(textToTranslate,{splitSentence,finalWords,user,cb})
            }else {
                Translation.consonantMethod(textToTranslate,{splitSentence,finalWords,user,cb})
            }
        }
    },
    vocalMethod: (word,{splitSentence,newSplitSentence,finalWords,hyphen,indexOfHypenWords,user,cb}) => {
        // TRANSLATING MORE THAN TWO WORDS WITH VOCALS AT THE BEGINNING
        if(splitSentence != undefined || newSplitSentence != undefined) {
            finalWords.push(word+"way")
            
                if(splitSentence != undefined){
                    if(splitSentence.length == finalWords.length) {
                        if(hyphen == true){
                            Translation.saveTranslation(splitSentence,finalWords,indexOfHypenWords,{user,cb});
                        }else {
                            Translation.saveTranslation(splitSentence.join(' '),finalWords.join(' '),indexOfHypenWords,{user,cb});
                        }
                    }
                }else {
                    if(newSplitSentence.length == finalWords.length) {
                        if(hyphen == true){
                            Translation.saveTranslation(newSplitSentence,finalWords,indexOfHypenWords,{user,cb});
                        }else {
                            Translation.saveTranslation(newSplitSentence.join(' '),finalWords.join(' '),indexOfHypenWords,{user,cb});
                        }
                    }
                }
        // TRANSLATING JUST ONE WORD                
        }else {            
            finalWords.push(word+'way');
            if(indexOfHypenWords != undefined){
                Translation.saveTranslation(word,finalWords,indexOfHypenWords,{user,cb});
            }else {
                Translation.saveTranslation(word,finalWords[0],indexOfHypenWords,{user,cb});
            }
        }
    },
    consonantMethod: (word,{splitSentence,newSplitSentence,finalWords,hyphen,indexOfHypenWords,user,cb}) => {

        // TRANSLATING MORE THAN ONE CONSONANT WORD
        if(splitSentence != undefined || newSplitSentence != undefined){

            let savedConsonantLetters = [];
            let i = 0;
            var count = 0;
        

            while (i<word.length){
                let l = word.charAt(0);
    
                // Check for vocal after consonant  
                if(['a','e','i','o','u'].includes(l) || 'y'.includes(l) && count >= 1) {
                    if(savedConsonantLetters[0] == 'q' && l == 'u'){
                        savedConsonantLetters.push(l);
                        word = word.replace(l,'');
                    }else {
                        break
                    }
                }else {
                    // Check for consonants, delete letters in word and add them to an array           
                    savedConsonantLetters.push(l);
                    word = word.replace(l,'');
                    count = count + 1;
                }
            }
            
            // Append consonant letters that it found before first vocal
            for(var j = 0;j < savedConsonantLetters.length; j++) {
                word = word + savedConsonantLetters[j];
            }
            
            // Adding 'ay'
            word = word + 'ay';
            finalWords.push(word);
           
            if(splitSentence != undefined){
                if(splitSentence.length == finalWords.length) {
                    if(hyphen == true){
                        
                        Translation.saveTranslation(splitSentence,finalWords,indexOfHypenWords,{user,cb});
                    }else {
                        Translation.saveTranslation(splitSentence.join(' '),finalWords.join(' '),indexOfHypenWords,{user,cb});
                    }
                }
            }else {
                if(newSplitSentence.length == finalWords.length) {
                      
                      
                    if(hyphen == true){
                        Translation.saveTranslation(newSplitSentence,finalWords,indexOfHypenWords,{user,cb});
                    }else {
                        Translation.saveTranslation(newSplitSentence.join(' '),finalWords.join(' '),indexOfHypenWords,{user,cb});
                    }
                }
            }

            // TRANSLATING JUST ONE CONSONANT WORD
        }else {
            var oldWord = word;
            var savedConsonantLetters = [];
            var i = 0;
            var count = 0;
        
            
            while (i<word.length){
                let l = word.charAt(i);
                // Check for vocal  
                if(['a','e','i','o','i'].includes(l) || 'y'.includes(l) && count >= 1) {
                
                    if(savedConsonantLetters[0] == 'q' && l == 'u'){
                        savedConsonantLetters.push(l);
                        word = word.replace(l,'');
              
                        break;
                    }else {
                        break;
                         
                    }
                }else {
                    // Check for consonants, delete letters in word and add them to an array
                  
                    savedConsonantLetters.push(l);
                    word = word.replace(l,'');
                    count = count + 1;
    

                }
            }
        
    
            // Append consonant letters that it found before first vocal
            for(var j = 0;j < savedConsonantLetters.length; j++) {
                word = word + savedConsonantLetters[j];
            }

        
            
            // Adding 'ay'
            word = word + 'ay';
            Translation.saveTranslation(oldWord,word,indexOfHypenWords,{user,cb});
        }
    
    },
    saveTranslation: (oldString,newString,indexOfHypenWords,{user,cb}) => {
      
        if(indexOfHypenWords != undefined && indexOfHypenWords.length >= 1){
            var minus = 0
            
            indexOfHypenWords.length == 1 ? minus = 0 : minus = 1
            
            for(var x = 0;x<indexOfHypenWords.length;x++){
    
                
                newString.splice(indexOfHypenWords[x],indexOfHypenWords.length-minus,newString[indexOfHypenWords[x]]+"-"+newString[indexOfHypenWords[x]+1]).join(' ')
                
                let translation = new Translation({
                    oldText:oldString.join(' ').toLowerCase(),
                    newText:newString.join(' ').toLowerCase()
                });
                
                translation.user_id = user._id

                translation.save()
                .then((translation) =>{
                    return cb(null,translation);
                })
                .catch((err) => {
                    cb(err,null)
                })            }

        }else {
            if(indexOfHypenWords != undefined && indexOfHypenWords.length >= 1) {
                var translation = new Translation({
                    oldText:oldString.join('-').toLowerCase(),
                    newText:newString.join('-').toLowerCase()
                });

            }else {
                 var translation = new Translation({
                    oldText:oldString.toLowerCase(),
                    newText:newString.toLowerCase()
                });
            }
        
            translation.user_id = user._id

            translation.save()
                .then((translation) =>{
                    return cb(null,translation);
                })
                .catch((err) => {
                    cb(err,null)
                })
        }

    }
}

let Translation = mongoose.model('Translation',TranslationSchema);

export default Translation
