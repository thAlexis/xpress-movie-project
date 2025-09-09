import express from "express";
import movieManageController from "../controllers/movie.controller.js";

const router = express.Router();

router.post("/", movieManageController.addMovie);

export default router;
