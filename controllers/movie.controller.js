import movieRepository from "../repositories/movie.repository.js";

async function addMovie(req, res, next) {
  console.log(req.body);
  const movie = req.body;
  const movieId = await movieRepository.addNewMovie(movie);
  console.log(movieId);
  if (!movieId) {
    return res.status(500).send("Erreur dans l'ajout du film");
  }
  res.render("moviemanage", { movie });
}

async function findLastfive(req, res, next) {
  const lastFive = await movieRepository.selectLastFiveMovies();
  console.log(lastFive);
  res.render("index", {
    lastFive,
    lastname: req.session.lastname,
    firstname: req.session.firstname,
    role: req.session.role,
  });
}

async function findById(req, res, next) {
  const id = req.params.id;
  const movie = await movieRepository.findMovieByID(id);
  if (typeof movie == "undefined" || typeof movie == "null") {
    return res.status(404).send("not found");
  }
  return res.render("moviePage", { movie });
}

export default { addMovie, findLastfive, findById };
