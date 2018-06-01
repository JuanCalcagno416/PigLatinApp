import express from 'express'
import trasnlationController from '../controllers/translation_controller'

const ROUTER = express.Router();

ROUTER.route('/')
    .post(trasnlationController.translate)

export default ROUTER;