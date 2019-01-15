import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import UserModel from '../../modules/user/UserModel';

export const getUser = async (token: string) => {
  if (!token) {
    return null
  }

  try {
    const decodedToken: any = jwt.verify(token.substring(4), process.env.JWT);

    const user = await UserModel.findOne({ email: decodedToken.id });

    return user
  } catch (err) {
    return null
  }
};

export const authenticate = (plainPassword, hash) => bcrypt.compareSync(plainPassword, hash);

export const encryptPassword = (plainPassword): string => bcrypt.hashSync(plainPassword, 8);