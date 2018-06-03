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
                console.log("--------- One word with spaces")                
                    splitSentence = undefined;
                    Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,user,cb});
                }else {
                    console.log("--------- Sentences")                
                    Translation.checkLetters(textToTranslate.toLowerCase(),{splitSentence,user,cb});
                }
                
            }else {
                console.log("--------- Word without space")
                Translation.checkLetters(textToTranslate.toLowerCase().replace(/\s+/g,''),{splitSentence,user,cb});
            }
        }
    },


    checkLetters: (textToTranslate,{splitSentence,user,cb}) => {
        var finalWords = [];
        // If its a sentence 
        if(splitSentence != undefined) {
            console.log("Checking for letters in sentences");
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
            console.log("Checking for letter in word");
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
            console.log('translating more than one word')
            finalWords.push(word+"way")
                if(splitSentence.length == finalWords.length) {
                    Translation.saveTranslation(splitSentence.join(' '),finalWords.join(' '),user,cb);
                }
        // TRANSLATING JUST ONE WORD                
        }else {
            console.log('translating just one word')
            finalWords.push(word+'way');
            console.log(finalWords);
            Translation.saveTranslation(word,finalWords[0],user,cb);
        }
    },
    consonantMethod: (word,{splitSentence,finalWords,user,cb}) => {

        // TRANSLATING MORE THAN ONE CONSONANT WORD
        if(splitSentence != undefined){
            console.log('translating more than one consonant word')
            let savedConsonantLetters = [];
            let i = 0;
        
            while (i<word.length){
                let l = word.charAt(0);
    
                // Check for vocal  
                if(['a','e','i','o','u'].includes(l)) {
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
                }
            }
        
    
            // Append consonant letters that it found before first vocal
            for(var j = 0;j < savedConsonantLetters.length; j++) {
                word = word + savedConsonantLetters[j];
            }
            
            // Adding 'ay'
            word = word + 'ay';
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
    
                // Check for vocal  
                if(['a','e','i','o','i'].includes(l)) {
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
                }
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
