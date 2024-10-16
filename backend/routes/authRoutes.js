import express from 'express';

import { signin, signup, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/signin', signin)
router.get('/signup', signup)
router.get('/logout', logout)

export default router;