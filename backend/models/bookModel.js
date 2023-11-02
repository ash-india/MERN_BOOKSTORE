import mongoose from "mongoose";

// new schema
const bookSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        author:{
            type: String,
            required: true,
        },
        publishYear:{
            type: Number,
            required: true,
        },
    },
    {
        timestamps:true,
    }
);
// we don't need id.s as it will be automatically provided by mongoDB

export const Book = mongoose.model('Cat',bookSchema);