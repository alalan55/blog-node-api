import UserService from "../services/userService.js";

const _userService = new UserService();

export const ResponseHandler = (message = null, content = null) => {
  return {
    message,
    content,
  };
};

class UserController {
  async createUser(req, res) {
    try {
      const newUser = await _userService.createUser(req.body);
      res.status(201).send(ResponseHandler("User created", newUser));
    } catch (error) {
      res
        .status(error.status || 400)
        .send(ResponseHandler(error.message || "Fail to create user"));
    }
  }

  async updateUser(req, res) {
    try {
      const user = await _userService.updateUser(req.body);

      res.status(200).send(ResponseHandler("User updated succefully", user));
    } catch (error) {
      res
        .status(error.status || 400)
        .send(ResponseHandler(error.message || "Fail to update user"));
    }
  }

  async deleteUser(req, res) {
    try {
      await _userService.removeUser(req.params.id);

      res.status(200).send(ResponseHandler("User removed"));
    } catch (error) {
      res
        .status(error.status || 400)
        .send(ResponseHandler(error.message || "Fail to remove user"));
    }
  }
}

export default UserController;
