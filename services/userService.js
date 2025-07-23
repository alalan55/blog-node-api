import UserModel from "../models/userModel.js";

export class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class UserService {
  async createUser(user) {
    try {
      const { email, name, password } = user;
      const alreadyRegistered = await this.getUserByEmail(email);

      if (alreadyRegistered)
        throw new HttpError("User already registered", 400);

      const hashPassword = password;

      const newUser = await UserModel.create({
        email,
        name,
        hashPassword,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(payload) {
    try {
      const user = await this.getUserById(payload.id);
      if (!user) throw new HttpError("User not found", 404);

      const hashPassword = payload.password;

      user.name = payload.name;
      user.email = payload.email;
      user.hashPassword = hashPassword;

      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await UserModel.findOne({
        where: { email },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      if (!userId) throw new HttpError("User ID is required", 400);
      
      const parsedId = +userId;
      const user = await UserModel.findByPk(parsedId);
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  async removeUser(userId) {
    try {
      const user = await this.getUserById(userId);

      if (!user) throw new HttpError("User not found", 404);

      await user.destroy();

      return;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
