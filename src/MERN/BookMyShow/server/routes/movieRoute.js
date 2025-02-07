const express = require('express');
const { addMovie, getAllMovies, updateMovie, deleteMovie } = require("../controllers/movieController");

const movieRouter = express.Router();

movieRouter.post("/add-movie", addMovie);
movieRouter.get("/get-all-movies", getAllMovies);
movieRouter.put("/update-movie", updateMovie);
movieRouter.delete("/delete-movie", deleteMovie);

module.exports = movieRouter;