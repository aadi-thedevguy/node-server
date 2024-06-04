import {z} from 'zod';

export const signupValidator = z.object({
  name: z.string().min(1, { message: 'The User Name is mandatory'}),
  email: z.string().email('Email Address should be in correct Format'),
  password: z.string().trim().min(7, { message: 'Enter a Valid Password' }),
});

export const loginValidator = z.object({
  email: z.string().email('Please Check Your Email Address'),
  password: z.string().min(7, { message: 'Enter a Valid Password' }),
});
