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
            Book_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.getTopBooks = (req, res) => {
            Book_1.default.find({}).sort({ taken: -1 }).limit(3).exec(function (err, books) {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.getBookByID = (req, res) => {
            let id = req.query.param;
            Book_1.default.findOne({ '_id': id }, (err, books) => {
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
        this.takeBook = (req, res) => {
            let _id = req.body._id;
            let number = req.body.number;
            let taken = req.body.taken;
            Book_1.default.updateOne({ '_id': _id }, { $set: { 'number': number, 'taken': taken } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.returnBook = (req, res) => {
            let _id = req.body._id;
            let number = req.body.number;
            Book_1.default.updateOne({ '_id': _id }, { $set: { 'number': number } }, (err, resp) => {
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
        this.searchBookByName = (req, res) => {
            let searchParams = req.query.param;
            Book_1.default.find({ 'name': { $regex: searchParams, $options: 'i' } }, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.searchBookByBoth = (req, res) => {
            let writer = req.body.writer;
            let name = req.body.name;
            Book_1.default.find({ 'writer': { $regex: writer, $options: 'i' }, 'name': { $regex: name, $options: 'i' } }, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.searchBookByWriter = (req, res) => {
            let searchParams = req.query.param;
            Book_1.default.find({ 'writer': { $regex: searchParams, $options: 'i' } }, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.getBorrowSortName = (req, res) => {
            Book_1.default.find({}).sort({ name: 1 }).exec(function (err, books) {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.getBorrowSortWriter = (req, res) => {
            Book_1.default.find({}).sort({ writer: 1 }).exec(function (err, books) {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map