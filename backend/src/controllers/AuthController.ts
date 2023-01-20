import { Request, Response, NextFunction } from 'express';
import IReq from '../interfaces/RequestInterface';
import * as jwt from 'jsonwebtoken';
import AuthServices from '../services/AuthServices';
import UserServices from '../services/UserServices';
import UserModel from "../models/UserModel";
import 'dotenv/config';
const userServices = new UserServices("users");

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class LoginController {
  static async loginAuth(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { _id } = await userServices.findByEmail(email);
      const token = await AuthServices.LoginAuth(email);
      UserModel.updateOne({ _id },{ token }, (err: unknown) => {
        if(err) return res.status(500).send({ message: err });
      })
      return res.status(200).json({ token, email, _id });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static validateToken = async (req: IReq, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
  
    try {
      const verifyToken = jwt.verify(token, JWT_SECRET);
      req.user = verifyToken;
    } catch (_error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    
    next();
  };

  static validateBody = async (req: IReq, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const username = await userServices.findByEmail(email);
    
    if (!username || username.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' }); 
    }

    next();
  };
}