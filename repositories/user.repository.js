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

export default { findByMail, addNewUser };
