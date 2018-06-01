import mongoose     from 'mongoose'

const TranslationSchema = new mongoose.Schema({
    oldWord:    {type:String},
    newWord:    {type:String},
    userId:     {type:mongoose.Schema.ObjectId,ref:'User'},

    created_at: {
        type:Date,
        default:Date.now
    }
})

TranslationSchema.statics = {

    translateWord: (wordToTranslate,user,cb) =>{
        let translation = new Translation({
            oldWord:wordToTranslate.toLowerCase()
        });
        translation.userId = user._id

        let firstLetter = translation.oldWord.charAt(0);

        switch (firstLetter) {
            case "a":
            break;
            case "e":
            break;
            case "i":
            console.log('Vocal');
                break;
            case "o":
                break;
            case "u":
                break;
            default :
            console.log('Consonant');
            break;
        }
    }

}

let Translation = mongoose.model('Translation',TranslationSchema);

export default Translation