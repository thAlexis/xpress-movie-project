import express from "express";
import "dotenv/config";
import session from "express-session";

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

app.set("view engine", "ejs");
app.set("views", import.meta.dirname + "/templates");

const PORT = process.env.PORT || 5555;

app.listen(PORT, () =>
  console.log(`Adresse serveur : http://localhost:${PORT}`)
);
