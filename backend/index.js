import express from "express";
import { PORT , mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
// import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js'
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow All Origins with Default of cors(*)

app.use(cors());

// Option 2: Allow cutom origins

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods:['GET','POST','PUT','DElETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/',(req,res)=>{
    console.log(req);
    // 234 - handshake connection successful
    return res.status(234).send("Welcome to MERN Stack");
});

// to use all the http methods in routes we will use the 'use' middleware 
app.use('/books',booksRoute);

mongoose
    .connect(mongoDBURL)
        .then(()=>{
            console.log('App connected to DataBase');
            app.listen(PORT, ()=>{
                console.log(`App is listening to port: ${PORT}`);
            });
        })
        .catch((error)=>{
            console.log(error)
        })
