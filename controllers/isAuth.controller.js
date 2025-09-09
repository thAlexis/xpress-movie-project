function isAuth(req, res, next) {
  if (req.session.lastname) {
    return next();
  }
  return res.redirect("/signin");
}

function isAdmin(req, res, next) {
  if (req.session.lastname && req.session.role === "admin") {
    return next();
  }
  res.status(403).send("Accès Refusé");
}

export default { isAuth, isAdmin };
