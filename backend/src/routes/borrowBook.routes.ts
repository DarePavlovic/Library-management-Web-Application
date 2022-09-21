import express from 'express';
import { BorrowBookController } from '../controllers/borrowBook.controller';


const borrowBookRouter = express.Router();

borrowBookRouter.route('/addBorrowBook').post(
    (req, res)=> new BorrowBookController().addBorrowBook(req,res)
)

borrowBookRouter.route('/getAllBorrowedBooks').get(
    (req, res)=> new BorrowBookController().getAllBorrowedBooks(req,res)
)


borrowBookRouter.route('/getAllBorrowBooks').get(
    (req, res)=> new BorrowBookController().getAllBorrowBooks(req,res)
)

borrowBookRouter.route('/returnBorrowBook').post(
    (req, res)=> new BorrowBookController().returnBorrowBook(req,res)
)


borrowBookRouter.route('/updateBorrowBook').post(
    (req, res)=> new BorrowBookController().updateBorrowBook(req,res)
)

borrowBookRouter.route('/getBorrowSortName').get(
    (req, res)=> new BorrowBookController().getBorrowSortName(req,res)
)

borrowBookRouter.route('/getBorrowSortStart').get(
    (req, res)=> new BorrowBookController().getBorrowSortStart(req,res)
)

borrowBookRouter.route('/getBorrowSortWriter').get(
    (req, res)=> new BorrowBookController().getBorrowSortWriter(req,res)
)

borrowBookRouter.route('/getAllBorrowBooksByBookId').get(
    (req, res)=> new BorrowBookController().getAllBorrowBooksByBookId(req,res)
)




export default borrowBookRouter;