import movieRepository from "../repositories/movie.repository.js";

async function addMovie(req, res, next) {
  console.log(req.body);
  const movie = req.body;
  const movieId = await movieRepository.addNewMovie(movie);
  console.log(movieId);
  if (!movieId) {
    return res.status(500).send("Erreur dans l'ajout du film");
  }
  res.redirect("/moviemanage");
}

export default { addMovie };
