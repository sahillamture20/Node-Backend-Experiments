import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const app = express();

const User = mongoose.model('User', { //User become users in the mongodb [becomes pural form of modal name]
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: Number,
    address: String,
})

app.get('/', (req, res) => { // Here '/' is home directory & we're using http method 'get'
    res.send("Hello World!!!");
})

mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("DB connection successful"))
        .catch((err) => console.log(err))


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
})