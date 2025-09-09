import connection from "../config/db.js";

async function findMovieByID(id) {
  const SELECT = "SELECT * FROM movies WHERE id = ?";
  const result = await connection.query(SELECT, id);
  return result[0][0];
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

export default { addNewMovie, findMovieByID };
