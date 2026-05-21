import { z } from 'zod';
export const registerSchema = z.object({ firstName: z.string().min(2), lastName: z.string().min(2), email: z.string().email(), phoneNumber: z.string().min(10), password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/) });
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) });
export const forgotSchema = z.object({ email: z.string().email() });
