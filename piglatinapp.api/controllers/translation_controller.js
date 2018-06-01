import Translation from '../models/translation_model';

module.exports = {

    translate: (req,res) => {
      Translation.translateWord (req.body.word,req.currentUser,(err,translation) => {
            if(err) return res.json(err);
            if(translation) return res.json(translation);
      });
    }
}