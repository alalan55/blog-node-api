import PostModel from "../models/postModel.js";
import UserService from "./userService";

const _userService = new UserService();

class PostService {
  async createPost(payload) {
    try {
      const { userId, title, description } = payload;
      const user = _userService.getUserById(userId);

      const newPost = await PostModel.create({
        title,
        description,
      });

      await newPost.addUser(user);

      return newPost;
    } catch (error) {
      throw error;
    }
  }
}

export default PostService;
