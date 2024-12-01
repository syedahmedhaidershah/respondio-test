import { z } from 'zod';
import { validateRequest } from './validateRequest';

const registerUserSchema = z.object({
  body: z.object({
    username: z.string().min(1),
    password: z.string().min(6),
    email: z.string().email(),
  }),
});

const loginUserSchema = z.object({
  body: z.object({
    username: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6),
  }).refine(data => data.username || data.email, {
    message: 'Either username or email is required',
  }),
});

export const validateRegisterUser = validateRequest(registerUserSchema);
export const validateLoginUser = validateRequest(loginUserSchema);
