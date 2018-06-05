import mongoose     from 'mongoose'

const TranslationSchema = new mongoose.Schema({
    oldText:    {type:String},
    newText:    {type:String},
    userId:     {type:mongoose.Schema.ObjectId,ref:'User'},

    created_at: {
        type:Date,
        default:Date.now
    }
}) 

TranslationSchema.statics = { 

    translateWord: (textToTranslate,user,cb) => {
        console.log(textToTranslate)
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
                console.log("TranslateWord --------- One word with spaces")                
   
                    if(/(\w-\w)|&/.test(textToTranslate)) {
                        splitSentence = textToTranslate.split("-");
                        var hyphen = true;
                        console.log(textToTranslate);
                        Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,hyphen,user,cb});

                    }else {
                        splitSentence = undefined;
                        Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,user,cb});
                    }

                }else {
                    console.log("TranslateWord --------- Sentences")   
                            // if (/(\w-\w)/g.test(textToTranslate)){
                            //     // AQIUIIIII
                            //     var hyphen = true;
                            //     console.log('TIENE GUION')
                            //     splitSentence = textToTranslate.split("-"); 
                            //     Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,hyphen,user,cb});
                            // }else{
                            //     Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,hyphen,user,cb});
                            // }
                    Translation.checkLetters(textToTranslate.toLowerCase(),{splitSentence,user,cb});
                }
                // WORD WITHOUT SPACE
            }else {
                console.log("TranslateWord --------- Word without space")
                console.log(textToTranslate)
            
                if (/(\w-\w)/g.test(textToTranslate)){
                    // AQIUIIIII
                    var hyphen = true;
                    console.log('TIENE GUION')
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
            console.log("CheckLetters ------ Checking for letters in sentences");
            console.log(splitSentence)
        // Check for letters in word of sentences
            for(var i = 0;i<splitSentence.length;i++) {
                console.log(i)
                console.log(splitSentence[i]);

                if(['a','e','i','o','u'].includes(splitSentence[i].toLowerCase().charAt(0))){
                    console.log('The word -> ' + splitSentence[i] + " begins with vocal");
                    
                    Translation.vocalMethod(splitSentence[i],{splitSentence,finalWords,hyphen,user,cb})
                }else {
                    console.log('The word -> ' + splitSentence[i] + " begins with consonant");
                    Translation.consonantMethod(splitSentence[i],{splitSentence,finalWords,hyphen,user,cb})
                }
            }
        // If its a word
        }else {

            console.log("CheckLetters ------  for letter in word");
            if(['a','e','i','o','u'].includes(textToTranslate.charAt(0))){
                console.log('The word -> ' + textToTranslate + " begins with vocal");
                Translation.vocalMethod(textToTranslate,{splitSentence,finalWords,user,cb})
            }else {
                console.log('The word -> ' + textToTranslate + " begins with consonant");
                Translation.consonantMethod(textToTranslate,{splitSentence,finalWords,user,cb})
            }
        }
    },
    vocalMethod: (word,{splitSentence,finalWords,hyphen,user,cb}) => {

        // TRANSLATING MORE THAN TWO WORDS WITH VOCALS AT THE BEGINNING
        if(splitSentence != undefined) {
            console.log('VocalMethod -------- Translating more than one word in vocal')
            console.log(word)
            console.log(finalWords)
            finalWords.push(word+"way")
            console.log(finalWords)
            // aquiiiii
                if(splitSentence.length == finalWords.length) {
                    if(hyphen == true){
                        Translation.saveTranslation(splitSentence.join('-'),finalWords.join('-'),user,cb);
                    }else {
                        Translation.saveTranslation(splitSentence.join(' '),finalWords.join(' '),user,cb);
                    }
                }
        // TRANSLATING JUST ONE WORD                
        }else {
            console.log('VocalMethod ------- Translating just one word')
            
            finalWords.push(word+'way');
            console.log(finalWords);
            Translation.saveTranslation(word,finalWords[0],user,cb);
        }
    },
    consonantMethod: (word,{splitSentence,finalWords,hyphen,user,cb}) => {

        // TRANSLATING MORE THAN ONE CONSONANT WORD
        if(splitSentence != undefined){
            console.log('-------- Translating more than one word in consonant')
            console.log(word)
            console.log(finalWords)
            let savedConsonantLetters = [];
            let i = 0;
            var count = 0;

        
            while (i<word.length){
                let l = word.charAt(0);
    
                // Check for vocal after consonant  
                if(['a','e','i','o','u'].includes(l) || 'y'.includes(l) && count >= 1) {
                    console.log('Loop - ' +i+' se topo con una vocal');
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
            
            console.log('ConsonantMethod  ------- Adding AY ')
            // Adding 'ay'
            word = word + 'ay';
            finalWords.push(word);
            console.log(word)
            console.log(finalWords)
          
            if(splitSentence.length == finalWords.length) {

                if(hyphen == true) {
                    Translation.saveTranslation(splitSentence.join('-'),finalWords.join('-'),user,cb);
                }else {
                    Translation.saveTranslation(splitSentence.join(' '),finalWords.join(' '),user,cb);                    
                }
            } 

            // TRANSLATING JUST ONE CONSONANT WORD
        }else {
            console.log('ConsonantMethod -------- translating one consonant word')
            var oldWord = word;
            var savedConsonantLetters = [];
            var i = 0;
            var count = 0;
        
            
            while (i<word.length){
                let l = word.charAt(i);
                 console.log(i)
                // Check for vocal  
                // AQUI TA EL PEO PARA YELLOW Y STYLE
                if(['a','e','i','o','i'].includes(l) || 'y'.includes(l) && count >= 1) {
                    console.log('Primer if del ciclo -- ' + i)
                    console.log(word);
                    console.log('Loop - ' +i+' se topo con una vocal' + l);
                
                    if(savedConsonantLetters[0] == 'q' && l == 'u'){
                        console.log('Segundo if del ciclo -- ' + i)
                        savedConsonantLetters.push(l);
                        word = word.replace(l,'');
                        console.log(i)
                        console.log(savedConsonantLetters)
                        console.log(word)
                        break;
                    }else {
                        break;
                         
                    }
                }else {
                    // Check for consonants, delete letters in word and add them to an array
                  
                    console.log('Chqueando consonantes ya que no hay vocales -- ' + i)
                    console.log(l)
                    savedConsonantLetters.push(l);
                    word = word.replace(l,'');
                    count = count + 1;
                    console.log('SE ACABA DE QUITAR   ' + l + "en word -> " + word);
                    console.log(savedConsonantLetters)
                    console.log(count)

                }
                console.log('Ultima linea del loop -- ' + i)
            }
        
    
            // Append consonant letters that it found before first vocal
            for(var j = 0;j < savedConsonantLetters.length; j++) {
                word = word + savedConsonantLetters[j];
            }

        
            
            // Adding 'ay'
            word = word + 'ay';
            Translation.saveTranslation(oldWord,word,user,cb);
        }
    
    },
    saveTranslation: (oldString,newString,user,cb) => {
        console.log('Saving Translation')
        console.log(newString)
        let translation = new Translation({
            oldText:oldString.toLowerCase(),
            newText:newString.toLowerCase()
        });
        
        translation.userId = user._id
            return cb(null,translation);

    }
}

let Translation = mongoose.model('Translation',TranslationSchema);

export default Translation
