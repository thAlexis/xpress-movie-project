import connection from "../config/db.js";

async function findMovieByID(id) {
  const SELECT = "SELECT * FROM movies WHERE id = ?";
  try {
    const result = await connection.query(SELECT, id);
    return result[0][0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function selectLastFiveMovies() {
  const SELECT = "SELECT * FROM movies ORDER BY release_date DESC LIMIT 5";
  try {
    const result = await connection.query(SELECT);
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addNewMovie(movie) {
  const INSERT = "INSERT INTO movies VALUES (null, ?, ?, ?, ?, ?)";
  try {
    const result = await connection.query(INSERT, [
      movie.title,
      movie.image,
      movie.summary,
      movie.releaseDate,
      movie.genre,
    ]);
    movie.id = result[0].insertId;
    return movie.id;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default { addNewMovie, findMovieByID, selectLastFiveMovies };
