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
    
                // Delete whitespace in array
                splitSentence = splitSentence.filter(function(str) {
                    return /\S/.test(str);
                });               
                
                // One Word with spaces
                if(splitSentence.indexOf(textToTranslate.replace(/\s+/g,'')) > -1){
                console.log("TranslateWord --------- One word with spaces")                
                    splitSentence = undefined;
                    Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,user,cb});
                }else {
                    console.log("TranslateWord --------- Sentences")                
                    Translation.checkLetters(textToTranslate.toLowerCase(),{splitSentence,user,cb});
                }
                
            }else {
                console.log("TranslateWord --------- Word without space")
                Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,user,cb});
            }
        }
    },


    checkLetters: (textToTranslate,{splitSentence,user,cb}) => {
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
                    
                    Translation.vocalMethod(splitSentence[i],{splitSentence,finalWords,user,cb})
                }else {
                    console.log('The word -> ' + splitSentence[i] + " begins with consonant");
                    Translation.consonantMethod(splitSentence[i],{splitSentence,finalWords,user,cb})
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
    vocalMethod: (word,{splitSentence,finalWords,user,cb}) => {

        // TRANSLATING MORE THAN TWO WORDS WITH VOCALS AT THE BEGINNING
        if(splitSentence != undefined) {
            console.log('VocalMethod -------- Translating more than one word in vocal')
            finalWords.push(word+"way")
            console.log(finalWords)
            // aquiiiii
                if(splitSentence.length == finalWords.length) {
                    Translation.saveTranslation(splitSentence.join(' '),finalWords.join(' '),user,cb);
                }
        // TRANSLATING JUST ONE WORD                
        }else {
            console.log('VocalMethod ------- Translating just one word')
            
            finalWords.push(word+'way');
            console.log(finalWords);
            Translation.saveTranslation(word,finalWords[0],user,cb);
        }
    },
    consonantMethod: (word,{splitSentence,finalWords,user,cb}) => {

        // TRANSLATING MORE THAN ONE CONSONANT WORD
        if(splitSentence != undefined){
            console.log('-------- Translating more than one word in consonant')
            console.log(word)
            console.log(finalWords)
            let savedConsonantLetters = [];
            let i = 0;
        
            while (i<word.length){
                let l = word.charAt(0);
    
                // Check for vocal after consonant  
                if(['a','e','i','o','u','y'].includes(l)) {
                    console.log('Loop - ' +i+' se topo con una vocal');
                    if(l == 'y') break;
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
                }
            }
        
            // Append consonant letters that it found before first vocal
            for(var j = 0;j < savedConsonantLetters.length; j++) {
                word = word + savedConsonantLetters[j];
            }
            
            // Adding 'ay'
            word = word + 'ay';
            finalWords.push(word);
            console.log('En sentences de consonantes')
            console.log(word)
            console.log(finalWords)
          
            if(splitSentence.length == finalWords.length) {
                Translation.saveTranslation(splitSentence.join(' '),finalWords.join(' '),user,cb);
            }

            // TRANSLATING JUST ONE CONSONANT WORD
        }else {
            console.log('translating one consonant word')
            var oldWord = word;
            let savedConsonantLetters = [];
            let i = 0;
        
            while (i<word.length){
                let l = word.charAt(i);
                 console.log(i)
                // Check for vocal  
                if(['a','e','i','o','i','y'].includes(l)) {
                    console.log('Primer if del ciclo -- ' + i)
                    if(l == 'y') break;
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
