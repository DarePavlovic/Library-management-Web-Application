import express from 'express';
import { BookController } from '../controllers/book.controller';


const bookRouter = express.Router();

bookRouter.route('/addBook').post(
    (req, res)=> new BookController().addBook(req,res)
)

bookRouter.route('/getAllBooks').get(
    (req, res)=> new BookController().getAllBooks(req,res)
)

bookRouter.route('/updateBook').post(
    (req, res)=> new BookController().updateBook(req,res)
)

bookRouter.route('/deleteBook').post(
    (req, res)=> new BookController().deleteBook(req,res)
)


bookRouter.route('/searchBookByName').get(
    (req, res)=> new BookController().searchBookByName(req,res)
)


bookRouter.route('/searchBookByWriter').get(
    (req, res)=> new BookController().searchBookByWriter(req,res)
)



export default bookRouter;