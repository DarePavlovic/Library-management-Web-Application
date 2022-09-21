import express from 'express';
import { BookWController } from '../controllers/bookW.controller';


const bookWRouter = express.Router();
bookWRouter.route('/addBook').post(
    (req, res)=> new BookWController().addBook(req,res)
)

bookWRouter.route('/getAllBooks').get(
    (req, res)=> new BookWController().getAllBooks(req,res)
)

bookWRouter.route('/deleteBook').post(
    (req, res)=> new BookWController().deleteBook(req,res)
)

bookWRouter.route('/getBookByID').get(
    (req, res)=> new BookWController().getBookByID(req,res)
)



export default bookWRouter;