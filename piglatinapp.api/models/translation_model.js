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

        console.log('----------------------------------------------------------------');
        if(textToTranslate == "" || /\s/g.test(textToTranslate) && textToTranslate == "") {
            cb(null,{"error":"You cannot leave this in blank"});
        }else {
            if (/\s/.test(textToTranslate)) {
                var splitSentence = textToTranslate.split(" ");
                console.log(splitSentence)
                // DELETE WHITESPACE IN ARRAY
                splitSentence = splitSentence.filter(function(str) {
                    return /\S/.test(str);
                });               
                 
                // ONE WORD WITH WHITESPACES 
                if(splitSentence.indexOf(textToTranslate.replace(/\s+/g,'')) > -1){
                console.log("TranslateWord --------- One word with spaces")                
   
                    // if(/(\w-\w)|&/.test(textToTranslate)) {
                    //     splitSentence = textToTranslate.split("-");
                    //     var hyphen = true;
                    //     console.log(textToTranslate);
                    //     console.log(hyphen)
                        Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,user,cb});

                    // }else {
                    //     splitSentence = undefined;
                    //     Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,user,cb});
                    // }

                }else {
                    console.log("TranslateWord --------- Sentences")   
                    Translation.checkLetters(textToTranslate.toLowerCase(),{splitSentence,user,cb});
                }
                // WORD WITHOUT SPACE
            }else {
                console.log("TranslateWord --------- Word without space")
                console.log(textToTranslate)
            
                if (/(\w-\w)/g.test(textToTranslate)){
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
            console.log(hyphen)
            console.log(splitSentence)

            var newSplitSentence = [];
            var hyphenwords = [];
            var indexOfHypenWords = []
            var i = 0
            // CHECKING HYPHEN IN ARRAY AND MAKING NEW ARRAY OF WORDS
            while(i<splitSentence.length) {
                console.log(i)
                console.log(splitSentence[i]);
                if(/(\w-\w)/g.test(splitSentence[i])) {
                    console.log('TIENE hyphen')
                    console.log(splitSentence[i])
                    hyphenwords = splitSentence[i].split('-')
                    var hyphen = true;
                    indexOfHypenWords.push(i)
                   
                    // indexOfHypenWords.push( hyphenwords.map((word) => {
                    //     return word
                    // }));
                    
                    console.log(hyphenwords);

                    for(var y = 0;y<hyphenwords.length;y++){
                        newSplitSentence.push(hyphenwords[y])
                        // indexOfHypenWords.push(hyphenwords[y])
                    }

               
                    i++
                }else {
                    newSplitSentence.push(splitSentence[i])
                    i++
                }
            }
            console.log('CHECKING NEWSPLITSENTENCE')
            console.log(newSplitSentence)
            console.log(indexOfHypenWords)

            // CHECKING FOR FIRST LETTER IN WORDS 
            for(var x = 0;x<newSplitSentence.length;x++){
                if(['a','e','i','o','u'].includes(newSplitSentence[x].toLowerCase().charAt(0))){
                    console.log('The word -> ' + newSplitSentence[x] + " begins with vocal");
                    console.log(newSplitSentence)
                    Translation.vocalMethod(newSplitSentence[x],{newSplitSentence,finalWords,hyphen,indexOfHypenWords,user,cb})
                }else {
                    console.log('The word -> ' + newSplitSentence[x] + " begins with consonant");
                    // console.log(newSplitSentence[x])
                    console.log(newSplitSentence)
                    console.log(newSplitSentence != undefined)
                    Translation.consonantMethod(newSplitSentence[x],{newSplitSentence,finalWords,hyphen,indexOfHypenWords,user,cb})
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
    vocalMethod: (word,{splitSentence,newSplitSentence,finalWords,hyphen,indexOfHypenWords,user,cb}) => {
        console.log('----------------- EN VOCAL METHOD')
        console.log(newSplitSentence)
        console.log(indexOfHypenWords);
        // TRANSLATING MORE THAN TWO WORDS WITH VOCALS AT THE BEGINNING
        if(splitSentence != undefined || newSplitSentence != undefined) {
            console.log('VocalMethod -------- Translating more than one word in vocal')
            console.log(word)
            console.log(finalWords)
            finalWords.push(word+"way")
            console.log(finalWords)
            
                if(splitSentence != undefined){
                    if(splitSentence.length == finalWords.length) {
                        if(hyphen == true){
                            Translation.saveTranslation(splitSentence,finalWords,indexOfHypenWords,user,cb);
                        }else {
                            Translation.saveTranslation(splitSentence.join(' '),finalWords.join(' '),user,cb);
                        }
                    }
                }else {
                    if(newSplitSentence.length == finalWords.length) {
                        if(hyphen == true){
                            Translation.saveTranslation(newSplitSentence,finalWords,indexOfHypenWords,user,cb);
                        }else {
                            Translation.saveTranslation(newSplitSentence.join(' '),finalWords.join(' '),user,cb);
                        }
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
    consonantMethod: (word,{splitSentence,newSplitSentence,finalWords,hyphen,indexOfHypenWords,user,cb}) => {
        console.log('----------------- EN CONSONANT METHOD')
        console.log(newSplitSentence)
        console.log(indexOfHypenWords)

        // TRANSLATING MORE THAN ONE CONSONANT WORD
        if(splitSentence != undefined || newSplitSentence != undefined){
            console.log('-------- Translating more than one word in consonant')
            console.log(word)
            console.log(finalWords)
            console.log(splitSentence)
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
            console.log(hyphen)
            console.log(word)
            console.log(finalWords)
            console.log(splitSentence)
           
            if(splitSentence != undefined){
                if(splitSentence.length == finalWords.length) {
                    if(hyphen == true){
                        console.log('GRABANDO CONSONNANT')
                        console.log(indexOfHypenWords)
                        
                        Translation.saveTranslation(splitSentence,finalWords,indexOfHypenWords,user,cb);
                    }else {
                        Translation.saveTranslation(splitSentence.join(' '),finalWords.join(' '),user,cb);
                    }
                }
            }else {
                if(newSplitSentence.length == finalWords.length) {
                    console.log('CASI  GRABANDO')
                    console.log(newSplitSentence);
                    console.log(finalWords)
                    if(hyphen == true){
                        Translation.saveTranslation(newSplitSentence,finalWords,indexOfHypenWords,user,cb);
                    }else {
                        Translation.saveTranslation(newSplitSentence.join(' '),finalWords.join(' '),user,cb);
                    }
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
    saveTranslation: (oldString,newString,indexOfHypenWords,user,cb) => {
        console.log('Saving Translation')
        console.log(newString.toString())
        // console.log(oldString)
        console.log(indexOfHypenWords)
        
        for(var x = 0;x<indexOfHypenWords.length;x++){


        //     // [ 'andrea', 'ricardo-nacho', 'pablo', 'jose-franco' ]
            console.log(newString[indexOfHypenWords[x]])
            console.log(indexOfHypenWords[x])

            console.log(newString.toString())
            newString.splice(indexOfHypenWords[x],indexOfHypenWords.length-1,newString[indexOfHypenWords[x]]+"-"+newString[indexOfHypenWords[x]+1]).join(' ')
            console.log('AFTER SPLICE')
            console.log(newString.toString())

        }

        // console.log('YA')
        return cb(null,{old:oldString.join(' '),new:newString.join(' ')})

        // for (var y = 0;y<newString.length;y++){
        //     // console.log(y)
        //     for(var x = 0;x<indexOfHypenWords.length;x++){
        //         // console.log(indexOfHypenWords[x])
        //         if(newString[y] == indexOfHypenWords[x]){
        //             console.log('AJA')
        //         }
        //     }
        //     // console.log(newString.toString())    
        //     // console.log('AFTER SPLICE')
        //     // console.log(newString.toString())
        // }
    }
}

let Translation = mongoose.model('Translation',TranslationSchema);

export default Translation
