import connection from "../config/db.js";
import userRepository from "../repositories/user.repository.js";
import passwordCrypt from "../config/bcrypt.js";

async function verifyUser(req, res, next) {
  console.log(req.session);
  const { mail, password } = req.body;
  const userFound = await userRepository.findByMail(mail);
  const user = userFound[0];
  console.log(userFound, user.password, user.lastname);
  if (
    userFound != null &&
    passwordCrypt.verifyPassword(password, user.password)
  ) {
    req.session.userId = user.id;
    req.session.firstname = user.firstname;
    req.session.lastname = user.lastname;
    req.session.role = user.role;
    console.log(req.session);
    return res.redirect("home");
  }
  res.status(401).send("Identifiants invalides");
}

async function registerUser(req, res, next) {
  const addedUser = await userRepository.addNewUser(req.body);
  console.log(addedUser);
  return res.redirect("signin");
}

function disconnectUser(req, res, next) {
  console.log(req.params.logout);
  if (req.params.logout == "logout") {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Erreur lors de la déconnexion");
      }
      return res.redirect("/home");
    });
  }
}

export default { verifyUser, disconnectUser, registerUser };
