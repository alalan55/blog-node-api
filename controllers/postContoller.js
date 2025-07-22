import PostService from "../services/postService.js";

const _postService = new PostService();

const ResponseHandler = (message = null, content = null) => {
  return {
    message,
    content,
  };
};

export default class PostController {
  async createPost(req, res) {
    const newPost = await _postService.createPost(req.body);

    res.status(201).send(ResponseHandler("Post created", newPost));

    try {
    } catch (error) {
      res
        .status(error.status || 400)
        .send(ResponseHandler(error.message || "Fail to create post"));
    }
  }
}
