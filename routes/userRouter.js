import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();
const _userController = new UserController();

router.post("/", (req, res) => _userController.createUser(req, res));
router.put("/", (req, res) => _userController.updateUser(req, res));
router.delete("/:id", (req, res) => _userController.deleteUser(req, res));

export default router;
