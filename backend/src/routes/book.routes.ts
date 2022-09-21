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
bookRouter.route('/searchBookByYear').post(
    (req, res)=> new BookController().searchBookByYear(req,res)
)
bookRouter.route('/searchBookByPublisher').get(
    (req, res)=> new BookController().searchBookByPublisher(req,res)
)
bookRouter.route('/searchBookByStyle').get(
    (req, res)=> new BookController().searchBookByStyle(req,res)
)

bookRouter.route('/searchBookByName').get(
    (req, res)=> new BookController().searchBookByName(req,res)
)


bookRouter.route('/searchBookByWriter').get(
    (req, res)=> new BookController().searchBookByWriter(req,res)
)


bookRouter.route('/takeBook').post(
    (req, res)=> new BookController().takeBook(req,res)
)
bookRouter.route('/returnBook').post(
    (req, res)=> new BookController().returnBook(req,res)
)
bookRouter.route('/getBookByID').get(
    (req, res)=> new BookController().getBookByID(req,res)
)
bookRouter.route('/getBorrowSortName').get(
    (req, res)=> new BookController().getBorrowSortName(req,res)
)
bookRouter.route('/getBorrowSortWriter').get(
    (req, res)=> new BookController().getBorrowSortWriter(req,res)
)
bookRouter.route('/getTopBooks').get(
    (req, res)=> new BookController().getTopBooks(req,res)
)

bookRouter.route('/searchBookByBoth').post(
    (req, res)=> new BookController().searchBookByBoth(req,res)
)


export default bookRouter;