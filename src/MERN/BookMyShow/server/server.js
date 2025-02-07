const express = require('express');

require('dotenv').config();
const connectDB = require('./config/dbConfig');
const userRouter = require("./routes/userRoute");
const movieRouter = require("./routes/movieRoute");

connectDB()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
const app = express();
app.use(express.json());
app.use('/api/users', userRouter);
app.use('api/movies', movieRouter);

app.listen(8082, () => {
    console.log('Server running on 8082');
})