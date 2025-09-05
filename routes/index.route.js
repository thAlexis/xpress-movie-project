import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:logout", userController.disconnectUser);

export default router;
