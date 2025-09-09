import express from "express";
import "dotenv/config";
import session from "express-session";
import userSignIn from "./routes/userSignIn.route.js";
import indexRouter from "./routes/index.route.js";
import userSignUp from "./routes/userSignUp.route.js";
import isAuth from "./controllers/isAuth.controller.js";
import movieManageRouter from "./routes/movieManage.route.js";

const app = express();

app.use(
  session({
    secret: "express-ejs",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded());

app.use(express.static("public"));

app.use("/signin", userSignIn);
app.use("/signup", userSignUp);
app.use("/index", indexRouter);
app.use("/moviemanage", movieManageRouter);

app.set("view engine", "ejs");
app.set("views", import.meta.dirname + "/templates");

app.get(["/", "/index", "/home", "/accueil"], (req, res, next) => {
  res.render("index", {
    lastname: req.session.lastname,
    firstname: req.session.firstname,
    role: req.session.role,
  });
});

app.get(["/inscription", "/signup"], (req, res, next) => {
  res.render("signup");
});

app.get(["/connexion", "/signin", "login"], (req, res, next) => {
  res.render("signin");
});

app.get("/moviemanage", isAuth.isAdmin, (req, res, next) => {
  res.render("movieManage", {
    lastname: req.session.lastname,
    firstname: req.session.firstname,
    role: req.session.role,
  });
});

const PORT = process.env.PORT || 5555;

app.listen(PORT, () =>
  console.log(`Adresse serveur : http://localhost:${PORT}`)
);
