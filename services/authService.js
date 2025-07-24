import UserService from "./userService.js";
import { HttpError, ComparePassword } from "../helpers/helpers.js";
import jwt from "jsonwebtoken";

const _userService = new UserService();

class AuthService {
  async login(info) {
    try {
      const { email, password } = info;

      const user = await _userService.getUserByEmail(email);
      if (!user) throw new HttpError("User not founded", 404);

      const passwordMatch = await ComparePassword(password, user.hashPassword);
      if (!passwordMatch) throw new HttpError("User password is invalid!", 400);

      const token = await this.generateToken(user);

      const response = {
        user,
        token,
      };

      response.user.hashPassword = null;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async generateToken(infos) {
    try {
      const { email, id } = infos;
      const SECRET_KEY = "123@456#";

      const payload = {
        email,
        id,
      };

      const token = jwt.sign({ ...payload }, SECRET_KEY, { expiresIn: "1h" });
      return token;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
