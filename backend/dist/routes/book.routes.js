"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRouter = express_1.default.Router();
bookRouter.route('/addBook').post((req, res) => new book_controller_1.BookController().addBook(req, res));
bookRouter.route('/getAllBooks').get((req, res) => new book_controller_1.BookController().getAllBooks(req, res));
bookRouter.route('/updateBook').post((req, res) => new book_controller_1.BookController().updateBook(req, res));
bookRouter.route('/deleteBook').post((req, res) => new book_controller_1.BookController().deleteBook(req, res));
bookRouter.route('/searchBookByName').get((req, res) => new book_controller_1.BookController().searchBookByName(req, res));
bookRouter.route('/searchBookByWriter').get((req, res) => new book_controller_1.BookController().searchBookByWriter(req, res));
bookRouter.route('/takeBook').post((req, res) => new book_controller_1.BookController().takeBook(req, res));
bookRouter.route('/returnBook').post((req, res) => new book_controller_1.BookController().returnBook(req, res));
bookRouter.route('/getBookByID').get((req, res) => new book_controller_1.BookController().getBookByID(req, res));
bookRouter.route('/getBorrowSortName').get((req, res) => new book_controller_1.BookController().getBorrowSortName(req, res));
bookRouter.route('/getBorrowSortWriter').get((req, res) => new book_controller_1.BookController().getBorrowSortWriter(req, res));
bookRouter.route('/getTopBooks').get((req, res) => new book_controller_1.BookController().getTopBooks(req, res));
bookRouter.route('/searchBookByBoth').post((req, res) => new book_controller_1.BookController().searchBookByBoth(req, res));
exports.default = bookRouter;
//# sourceMappingURL=book.routes.js.map