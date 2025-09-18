import userFavoritesRepository from "../repositories/userFavorites.repository.js";

async function addNewFav(req, res, next) {
  const movieId = req.params.id;
  const result = await userFavoritesRepository.addNewFav(
    movieId,
    req.session.userId
  );
  console.log(result);
  if (result[0].affectedRows == 0) {
    return res.status(500).send("erreur lors de l'ajout aux favoris");
  }
  const added = true;
  req.session.movieFavs.push(movieId);
  console.log(req.session.movieFavs);
  return res.redirect(`/moviePage/${movieId}`);
}

async function selectAllFav(req, res, next) {
  console.log(req.session.userId);
  const userId = req.session.userId;
  const movies = await userFavoritesRepository.selectAllFav(userId);
  if (movies) {
    return res.render("userFavorites", {
      movies,
      lastname: req.session.lastname,
      firstname: req.session.firstname,
      role: req.session.role,
    });
  }
  return res.status(404).send("Erreur lors de la recuperation des favoris");
}

async function deleteMovie(req, res, next) {
  const movieId = req.params.id;
  const userId = req.session.userId;
  const deleteOne = await userFavoritesRepository.deleteOne(movieId, userId);
  console.log(deleteOne);
  console.log(req.session.movieFavs);
  req.session.movieFavs = req.session.movieFavs.filter(
    (movie) => movie !== movieId
  );
  console.log(req.session.movieFavs);
  return res.redirect(`/moviePage/${movieId}`);
}

async function destroyAllFavs(req, res, next) {
  const userId = req.session.userId;
  const deleteAll = await userFavoritesRepository.deleteAllByUser(userId);
  console.log(deleteAll);
  next();
}

export default { addNewFav, selectAllFav, deleteMovie, destroyAllFavs };
