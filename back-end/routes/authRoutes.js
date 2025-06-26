import express from 'express';
import { register, login, profile } from '../controllers/authController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verificarToken, profile);

export default router;
