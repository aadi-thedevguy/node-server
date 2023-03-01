import { Router } from 'express';
import { userControllers } from './user.controllers';
import { loginValidator, signupValidator } from './users.validator';

/*Fire the router function*/
export const userRouter : Router = Router();


userRouter.post(
  '/signup',
  signupValidator,
  userControllers.registerUser,
);

userRouter.post(
  '/login',
  loginValidator,
  userControllers.loginUser,
);
