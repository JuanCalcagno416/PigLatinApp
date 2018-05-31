import express from 'express';
import userRoutes from './user_routes';
import authRoutes from './auth_routes';

const ROUTER = express.Router(); 

ROUTER.use('/users', userRoutes);
ROUTER.use('/login',authRoutes)

export default ROUTER;