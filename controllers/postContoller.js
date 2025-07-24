import PostService from "../services/postService.js";

const _postService = new PostService();

const ResponseHandler = (message = null, content = null) => {
  return {
    message,
    content,
  };
};

export default class PostController {
  async getAllPosts(req, res) {
    try {
      const userId = req.params.userId;
      const posts = await _postService.getAllPosts(userId);

      res.status(200).send(ResponseHandler("Posts retrieved", posts));
    } catch (error) {
      res
        .status(error.status || 400)
        .send(ResponseHandler(error.message || "Fail to retrieve posts"));
    }
  }

  async createPost(req, res) {
    try {
      if (req.body.userId !== req.user.id)
        return res.status(401).send(ResponseHandler("User is not authorized"));

      const newPost = await _postService.createPost(req.body);

      res.status(201).send(ResponseHandler("Post created", newPost));
    } catch (error) {
      res
        .status(error.status || 400)
        .send(ResponseHandler(error.message || "Fail to create post"));
    }
  }

  async removePost(req, res) {
    try {
      if (req.body.userId !== req.user.id)
        return res.status(401).send(ResponseHandler("User is not authorized"));

      await _postService.removePost(req.params.id);

      res.status(204).send(ResponseHandler("Post removed"));
    } catch (error) {
      res
        .status(error.status || 400)
        .send(ResponseHandler(error.message || "Fail to remove post"));
    }
  }
}
