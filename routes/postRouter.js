import express from "express";
import PostController from "../controllers/postContoller.js";
import { authenticateToken } from "../middleware/authenticated.js";

const router = express.Router();
const _postController = new PostController();

router.get("/:userId", (req, res) => _postController.getAllPosts(req, res));

router.post("/", authenticateToken, (req, res) =>
  _postController.createPost(req, res)
);

router.delete("/:id", authenticateToken, (req, res) =>
  _postController.removePost(req, res)
);

export default router;
