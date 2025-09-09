import express from "express";
import userController from "../controllers/user.controller.js";
import movieController from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/:logout", userController.disconnectUser);
router.get("/", movieController.findLastfive);

export default router;
