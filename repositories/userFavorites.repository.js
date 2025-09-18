import connection from "../config/db.js";
import dayjs from "dayjs";

async function addNewFav(movieId, userId) {
  const INSERT = "INSERT INTO user_favorites VALUES (?, ?, ?)";
  const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
  try {
    const result = await connection.query(INSERT, [userId, movieId, now]);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function selectAllFav(userId) {
  const SELECT =
    "SELECT * FROM movies m JOIN user_favorites uf ON uf.id_movie = m.id WHERE uf.id_user = ?";
  try {
    const result = await connection.query(SELECT, userId);
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function deleteOne(movieId, userId) {
  const DELETE =
    "DELETE FROM user_favorites WHERE id_movie = ? AND id_user = ?";
  try {
    const result = await connection.query(DELETE, [movieId, userId]);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function deleteAllByUser(userId) {
  const DELETE = "DELETE FROM user_favorites WHERE id_user = ?";
  try {
    const result = await connection.query(DELETE, userId);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default { addNewFav, selectAllFav, deleteOne, deleteAllByUser };
