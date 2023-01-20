import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/UserInterface';
import UserServices from '../services/UserServices';
const userServices = new UserServices("users");

export default class AuthServices {

    static createToken = (user: object) => {
      const payload = {
        username: user,
      };
      
      const secret = 'jwt_secret';
      const options = { expiresIn: '30d' };
      const token = jwt.sign(payload, secret, options);

      return token;
    };

    static async LoginAuth(userEmail: string) {
      const user = await userServices.findByEmail(userEmail)

      if (user) {
        const { email } = user;
        const newToken = AuthServices.createToken({ email });

        return newToken;
      }
    }
  
    static async LoginValidateRole(userEmail: string) {
      const user = await userServices.findByEmail(userEmail)

      if (user) {
        const { role } = user;
        return role;
      } else {
        return null;
      }
    }
};
