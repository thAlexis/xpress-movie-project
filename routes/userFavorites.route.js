import express from "express";
import userFavoritesController from "../controllers/userFavorites.controller.js";

const router = express.Router();

router.get("/", userFavoritesController.selectAllFav);

export default router;
