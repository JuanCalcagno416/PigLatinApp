import express from 'express';
import authController from '../controllers/auth_controller';

const ROUTER = express.Router();

ROUTER.route('/')
    .post(authController.access);

export default ROUTER;