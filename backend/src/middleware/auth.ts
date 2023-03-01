import { Response, Request, NextFunction } from 'express';
import { verify, Secret } from 'jsonwebtoken';
import { User } from '../users/user.model';
import { MyRequest, MyPayload } from '../_interfaces';

export const protect = 
  async (
    req: MyRequest,
    res: Response,
    next: NextFunction,
  ) => {
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // get token from header
        token = req.headers.authorization.split(' ')[1]

        // check if token exists
        if (!token) {
          res.status(401).json('Not Authorized, No Token Available')
        }
        // verify token
        const decoded = verify(
          token,
          process.env.JWT_SECRET as Secret,
        ) as MyPayload;

        // Get the user ID from the token payload

        let user = await User.findById(decoded.id).select(
          '-password',
        );

        if (user) req.user = user;
        next();
      } catch (err) {
        // console.log(err);
        res.status(500).json('Internal Server Error')
      }
    }
  
  }
