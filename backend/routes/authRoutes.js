import express from 'express';

import { signin, signup, logout, checkAuth } from '../controllers/authController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/logout', logout)
router.get('/check', verifyToken, checkAuth)

export default router;