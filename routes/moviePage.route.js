import express from "express";
import movieController from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/:id", movieController.findById);

export default router;
