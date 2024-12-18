import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),
    user: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Invalid email format'),
      photo: z.string().optional(),
      role: z.enum(['user', 'admin']).optional().default('user'),
    }),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Invalid email format').optional(),
    photo: z.string().optional(),
    role: z.enum(['user', 'admin']).optional().default('user').optional(),
  }),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const updateRoleSchema = z.object({
  role: z.enum(['user', 'admin'], {
    errorMap: () => ({ message: 'Role must be either user or admin' }),
  }),
});
export const UserValidation = {
  registerSchema,
  loginSchema,
  updateRoleSchema,
  updateUserSchema,
};
