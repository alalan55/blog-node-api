import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();
const _authControler = new AuthController();

router.post("/", (req, res) => _authControler.login(req, res));

export default router;
