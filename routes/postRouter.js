import express from "express";
import PostController from "../controllers/postContoller.js";

const router = express.Router();
const _postController = new PostController();

router.get("/:userId", (req, res) => _postController.getAllPosts(req, res));
router.post("/", (req, res) => _postController.createPost(req, res));
router.delete("/:id", (req, res) => _postController.removePost(req, res));

export default router;
