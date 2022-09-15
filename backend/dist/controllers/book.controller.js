"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const Book_1 = __importDefault(require("../models/Book"));
class BookController {
    constructor() {
        this.addBook = (req, res) => {
            var ObjectID = require('bson').ObjectID;
            var id = new ObjectID();
            let book = new Book_1.default({
                _id: id,
                name: req.body.name,
                writer: req.body.writer,
                style: req.body.style,
                publisher: req.body.publisher,
                year: req.body.year,
                language: req.body.language,
                picture: req.body.picture,
                number: req.body.number
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
            Book_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.updateBook = (req, res) => {
            let _id = req.body._id;
            let name = req.body.name;
            let writer = req.body.writer;
            let style = req.body.style;
            let publisher = req.body.publisher;
            let year = req.body.year;
            let language = req.body.language;
            let picture = req.body.picture;
            let number = req.body.number;
            // let objectIdArray=Array.prototype.map(_id=>mongoose.Types.ObjectId);
            Book_1.default.updateOne({ '_id': _id }, { $set: { 'name': name, 'writer': writer, 'style': style, "publisher": publisher,
                    'year': year, 'language': language, 'picture': picture, 'number': number } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.deleteBook = (req, res) => {
            let _id = req.body._id;
            Book_1.default.deleteOne({ '_id': _id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map