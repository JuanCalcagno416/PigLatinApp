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

        if (/\s/.test(textToTranslate)) var splitString = textToTranslate.split(" ");
        console.log(splitString)

        if(splitString == undefined){
            
            let firstLetter = textToTranslate.charAt(0)

            Translation.checkFirstLetter(firstLetter,textToTranslate.toLowerCase(),(completeWord) => {
        
                let translation = new Translation({
                    oldText:textToTranslate.toLowerCase(),
                    newText:completeWord
                });
                translation.userId = user._id

                cb(null,translation)

            });
        }else {
            
        }

    },


    checkFirstLetter: (firstLetter,text,cb) => {
        console.log("Checking first letter");
        switch (firstLetter) {
            case "a":
            Translation.vocalMethod(text,cb)
            break;
            case "e":
            Translation.vocalMethod(text,cb)
            break;
            case "i":
            Translation.vocalMethod(text,cb)
                break;
            case "o":
            Translation.vocalMethod(text,cb)
                break;
            case "u":
            Translation.vocalMethod(text,cb)
                break;
            default :
            Translation.consonantMethod(text,cb)
            break;
        }
    },

    vocalMethod: (text,cb) => {
        console.log("Vocal method, letter ->   " + text)
        return cb(text+"way")
    },

    consonantMethod: (completeWord,cb) => {
        let savedConsonantLetters = [];
        let i = 0;

        console.log("Consonant method, letter ->   " + completeWord)

        // Check word until it for letters 

        while (i<completeWord.length){
            let l = completeWord.charAt(i);

            // Check for vocal  
            if(l == "a" || l == "e" || l == "i" || l == "o" || l == 'u') {
                console.log('Loop - ' +i+' se topo con una vocal');
                if(savedConsonantLetters[0] == 'q' && l == 'u'){
                    savedConsonantLetters.push(l);
                    completeWord = completeWord.replace(l,'');
                }else {
                    break
                }
            }else {
                // Check for consonants, delete letters in word and add them to an array                
                savedConsonantLetters.push(l);
                completeWord = completeWord.replace(l,'');
            }
        }
    

        // Append consonant letters that it found before first vocal
        for(var j = 0;j < savedConsonantLetters.length; j++) {
            console.log(savedConsonantLetters[j])
            completeWord = completeWord + savedConsonantLetters[j];
        }
        
        // Adding 'ay'
            completeWord = completeWord + 'ay';

        console.log(completeWord)
        return cb(completeWord)
    }


}

let Translation = mongoose.model('Translation',TranslationSchema);

export default Translation