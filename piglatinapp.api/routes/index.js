import express from 'express';
import userRoutes from './user_routes';
import authRoutes from './auth_routes';
import translationRoutes from './translation_routes';
import interceptor from '../services/interceptor';

const ROUTER = express.Router(); 

ROUTER.use('/users', userRoutes);
ROUTER.use('/login',authRoutes);
ROUTER.use('/translate',interceptor,translationRoutes);
ROUTER.use('/translations',interceptor,translationRoutes);

export default ROUTER;