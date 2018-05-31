import express from 'express'
import userController from '../controllers/user_controller'

const ROUTER = express.Router();

ROUTER.route('/')
    .post(userController.createUser)

export default ROUTER;