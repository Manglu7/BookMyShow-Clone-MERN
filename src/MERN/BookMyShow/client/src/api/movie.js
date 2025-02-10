import {axiosInstance} from './index'

export const getAllMovies = async () => {
    try{
        const response = await axiosInstance.get('/api/movies/get-all-movies');
        return response.data;
    }
    catch(err){
        console.log('error while calling getAllMovies api',err);
    }
}

export const addMovie = async (movie) => {
    try{
        const response = await axiosInstance.post('/api/movies/add-movie', movie);
        return response.data;
    }
    catch(err){
        console.log('error while calling addMovie api',err);
    }
}

export const updateMovie = async (movie) => {
    try{
        const response = await axiosInstance.put('/api/movies/update-movie', movie);
        return response.data;
    }
    catch(err){
        console.log('error while calling updateMovie api',err);
    }
}

export const deleteMovie = async (movieId) => {
    try{
        const response = await axiosInstance.delete(`/api/movies/delete-movie`, movieId);
        return response.data;
    }
    catch(err){
        console.log('error while calling deleteMovie api',err);
    }
}