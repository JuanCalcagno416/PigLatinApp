import Translation from '../models/translation_model';

module.exports = {

    translate: (req,res) => {
      Translation.translateWord (req.body.text,req.currentUser,(err,translation) => {
            if(err) return res.json(err);
            if(translation) return res.json(translation);
      });
    },
    getTranslationsFromUser: (req,res) => {

        console.log(req.currentUser)
        Translation.find({user_id:req.currentUser.id}).sort({date: 'desc'})
            .then(function (translations) {
                if(!translations) return res.json({"error":"TranslationsNotFound"})
                return res.json(translations);
            })
            .catch(function (err) {
                return res.json(err);
            })
        }

}