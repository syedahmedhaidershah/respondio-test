import { z } from 'zod';
import { validateRequest } from './validateRequest';

const createNoteSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    type: z.enum(['personal', 'work']),
  }),
});

const updateNoteSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
  }),
});

export const validateCreateNote = validateRequest(createNoteSchema);
export const validateUpdateNote = validateRequest(updateNoteSchema);
