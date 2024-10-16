import express from 'express';

import { signin, signup, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/logout', logout)

export default router;