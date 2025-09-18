import express from "express";
import movieController from "../controllers/movie.controller.js";
import userFavoritesController from "../controllers/userFavorites.controller.js";

const router = express.Router();

router.get("/:id", movieController.findById);
router.post("/:id", userFavoritesController.addNewFav);
router.delete("/:id", userFavoritesController.deleteMovie);

export default router;
