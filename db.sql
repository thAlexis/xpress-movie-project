CREATE DATABASE xpressmovie_project;

USE xpressmovie_project;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lastname VARCHAR(30),
  firstname VARCHAR(30),
  mail VARCHAR(256) UNIQUE ,
  password VARCHAR(256),
  role VARCHAR(16));

CREATE TABLE movies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(256) UNIQUE ,
  image VARCHAR(256),
  summary VARCHAR(256),
  release_date DATETIME,
  genre VARCHAR(30)
);

CREATE TABLE user_favorites (
  id_user INT,
  id_movie INT,
  add_date DATETIME,
  PRIMARY KEY (id_user, id_movie),
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_movie) REFERENCES movies(id)
);

