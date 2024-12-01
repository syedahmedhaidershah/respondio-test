import express from 'express';
import { registerUser, loginUser } from '../modules/auth/auth.controller';
import { validateRegisterUser, validateLoginUser } from '../middleware/auth.validator';

const router = express.Router();

router.post('/register', validateRegisterUser, registerUser);
router.post('/login', validateLoginUser, loginUser);

export default router;
