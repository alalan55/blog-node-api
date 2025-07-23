import PostModel from "../models/postModel.js";
import UserService from "./userService.js";

const _userService = new UserService();

export class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class PostService {
  async getAllPosts(userId) {
    try {
      const posts = await PostModel.findAll({
        where: {
          userId,
        },
      });

      return posts;
    } catch (error) {
      throw error;
    }
  }

  async createPost(payload) {
    try {
      const { userId, title, description } = payload;

      const user = await _userService.getUserById(userId);

      if (!user) throw new HttpError("User not found", 404);

      const newPost = await PostModel.create({
        title,
        description,
      });

      newPost.setUser(user);

      return newPost;
    } catch (error) {
      throw error;
    }
  }

  async removePost(postId) {
    try {
      const post = await PostModel.findByPk(postId);

      if (!post) throw new HttpError("Post not found", 404);

      await post.destroy();
    } catch (error) {
      throw error;
    }
  }
}

export default PostService;
