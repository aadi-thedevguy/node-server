import { Secret, sign } from 'jsonwebtoken';
import {Types} from 'mongoose'
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { User, IUser } from './user.model';
import {LoginBody} from '../_interfaces'

// Register new User

const registerUser = async (req: Request<{},{},IUser>, res: Response) : Promise<Response> => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

    const newUser = req.body;
    const {name,email, password} = newUser

    try {
       // check if user exists
    const userExits = await User.findOne({ email });

    if (userExits) {
    return res.status(400).json({errors : 'User Already Exits'})
    }
    // Hash Password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(
      password,
      salt,
    );

    // Create User
    const user = await User.create<IUser>({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      return res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({errors : 'Invalid Credentials'})
    }
    } catch (error) {
      return res.status(500).json({errors : 'Internal Server Error'})
    }

   
  }

// Description   Authenticate a User
// Route         POST /api/users/login
// Access        Public

const loginUser = 
  async (req: Request<{},{},LoginBody>, res: Response) : Promise<Response> => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const userObj = req.body;
    const { email, password } = userObj

    try {
       // check for user email
    const user = await User.findOne({ email });
    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      return res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ errors: 'Invalid Credentials' });
    }
    } catch (error) {
      return res.status(500).json({errors : 'Internal Server Error'})
    }

   
  }


// generate JWT
const generateToken = (id : Types.ObjectId) => {
  return sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: '24h',
  });
};

export const userControllers = {
  registerUser,
  loginUser,
};
