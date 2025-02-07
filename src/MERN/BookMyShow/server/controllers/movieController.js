const Movie = require('../models/moviesModel');

const addMovie = async (req, res) => {
    try{
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: "Movie added"
        })
    }
    catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

const getAllMovies = async (req, res) => {
    try{
        const allMovies = await Movie.find();
        res.send({
            success: true,
            message: "All Movies fetched successfully.",
            data: allMovies
        })
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const updateMovie = async (req, res) => {
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.body.id, req.body);
        res.send({
            success: true,
            message: "Movie updated",
            data: updatedMovie
        })
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
            data: null
        })
    }
}

const deleteMovie = async (req, res) => {
    try{
        const deletedMovie = await Movie.findByIdAndDelete(req.body.id);
        res.send({
            success: true,
            message: "Movie deleted",
            data: deletedMovie
        })
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
            data: null
        })
    }
}

module.exports = { addMovie, getAllMovies, updateMovie, deleteMovie };