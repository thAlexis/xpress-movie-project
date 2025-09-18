import express from "express";
import isAuthController from "../controllers/isAuth.controller.js";
import userFavoritesController from "../controllers/userFavorites.controller.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", isAuthController.isAuth, (req, res, next) => {
  res.render("account", {
    userId: req.session.userId,
    firstname: req.session.firstname,
    lastname: req.session.lastname,
    role: req.session.role,
  });
});

router.delete(
  "/",
  userFavoritesController.destroyAllFavs,
  userController.deleteUser
);

router.patch("/", userController.modifyNames);

export default router;
