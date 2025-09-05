import express from "express";
import "dotenv/config";
import session from "express-session";
import userSignIn from "./routes/userSignIn.route.js";

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

app.set("view engine", "ejs");
app.set("views", import.meta.dirname + "/templates");

app.get(["/", "/home", "/accueil"], (req, res, next) => {
  res.render("index");
});

app.get(["/inscription", "/signup"], (req, res, next) => {
  res.render("signup");
});

app.get(["/connexion", "/signin", "login"], (req, res, next) => {
  res.render("signin");
});

const PORT = process.env.PORT || 5555;

app.listen(PORT, () =>
  console.log(`Adresse serveur : http://localhost:${PORT}`)
);
