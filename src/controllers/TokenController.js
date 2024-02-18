import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais Invalidas'],
      });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuario Nao Existe'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha Invalida'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenController();