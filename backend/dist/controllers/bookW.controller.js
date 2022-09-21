"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookWController = void 0;
const BookW_1 = __importDefault(require("../models/BookW"));
class BookWController {
    constructor() {
        this.addBook = (req, res) => {
            var ObjectID = require('bson').ObjectID;
            var id = new ObjectID();
            let book = new BookW_1.default({
                _id: id,
                username: req.body.username,
                name: req.body.name,
                writer: req.body.writer,
                style: req.body.style,
                publisher: req.body.publisher,
                year: req.body.year,
                language: req.body.language,
                picture: req.body.picture,
                number: req.body.number,
                taken: 0
            });
            book.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    res.json({ "message": "ok" });
                }
            });
        };
        this.getAllBooks = (req, res) => {
            BookW_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.getBookByID = (req, res) => {
            let id = req.query.param;
            BookW_1.default.findOne({ '_id': id }, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.deleteBook = (req, res) => {
            let _id = req.body._id;
            BookW_1.default.deleteOne({ '_id': _id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.BookWController = BookWController;
//# sourceMappingURL=bookW.controller.js.map