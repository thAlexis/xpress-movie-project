import connection from "../config/db.js";
import passwordCrypt from "../config/bcrypt.js";

async function findByMail(mail) {
  const SELECT = "SELECT * FROM users WHERE mail = ?";
  try {
    const result = await connection.query(SELECT, mail);
    return result[0] || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addNewUser(newUser) {
  const INSERT = `INSERT INTO users (lastname, firstname, mail, password, role) VALUES ( ?, ?, ?, ?, "user")`;
  try {
    const password = (
      await passwordCrypt.hashPassword(newUser.password)
    ).toString();
    const result = await connection.query(INSERT, [
      newUser.lastname,
      newUser.firstname,
      newUser.mail,
      password,
    ]);
    newUser.id = result.insertId;
    return newUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function deleteUserById(userId) {
  const DELETE = "DELETE FROM users WHERE id = ?";
  try {
    const result = await connection.query(DELETE, userId);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function modifyUser(userId, newLastname, newFirstname) {
  const UPDATE = "UPDATE users SET lastname = ?, firstname = ? WHERE id = ?";
  try {
    const result = await connection.query(UPDATE, [
      newLastname,
      newFirstname,
      userId,
    ]);
    console.log(result);
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default { findByMail, addNewUser, deleteUserById, modifyUser };
