import AuthService from "../services/authService.js";
import { ResponseHandler } from "../helpers/helpers.js";

const _authService = new AuthService();

class AuthController {
  async login(req, res) {
    try {
      const content = await _authService.login(req.body);

      res.status(200).send(ResponseHandler("Login succefully:", content));
    } catch (error) {
      res
        .status(error.status || 400)
        .send(ResponseHandler(error.message || "Fail to login"));
    }
  }
}
export default AuthController;
