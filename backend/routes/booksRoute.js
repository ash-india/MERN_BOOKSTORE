import express from "express"
const router = express.Router();
import { Book } from '../models/bookModel.js'

// Route for Save a new Book

// using the function asynchronously because accessing mongoose is a asynchronous process
router.post('/',async(request,response)=>{ 
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            // 400 - unable to process the server request
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear,
        };

        // this will create a new record in database
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        // 500 - internal server error
        response.status(500).send({message:error.message});
    }
});

// Route for Get all Books from database

router.get("/",async(request,response)=>{
    try {

        // This will store all the records in books
        const books = await Book.find({});
        
        // .json(books) will directly send all the books
        // count is the number of records and data is all the books
        return response.status(200).json({
            count:books.length,
            data :books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route for Get One Book from database by id

// here id is the parameters passed in the url
router.get("/:id",async(request,response)=>{
    // console.log('Hello');
    try {

        const {id} = request.params;
        console.log(request.params);
        // This will store the book with matching id
        const book = await Book.findById(id);
        
        // .json(books) will directly send the books details
        return response.status(200).json(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route to update a record

// here we need both parameter to update the body and the new body for the id

// here we will use the put method
router.put('/:id', async (request,response)=>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id }=request.params;

        // find and update
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({ message:"Book Not Found" });
        }
        
        return response.status(200).send({message:"Book updated successfully"});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});        
    }
})

// Route to delete a book

// here we only need the parameter(id) to delete the book

router.delete('/:id',async(request,response)=>{
    try {

        const {id} = request.params;
        
        // find and delete
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Book Not Found'});
        }
        
        return response.status(200).send({message:'Book deleted Successfully'});   // .send(result) print the deleted record

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message : error.message});
    }
})

// exporting all the http requests
export default router;