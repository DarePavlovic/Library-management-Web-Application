"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBookController = void 0;
const BorrowBook_1 = __importDefault(require("../models/BorrowBook"));
class BorrowBookController {
    constructor() {
        this.addBorrowBook = (req, res) => {
            var ObjectID = require('bson').ObjectID;
            var id = new ObjectID();
            let borrowBook = new BorrowBook_1.default({
                username: req.body.username,
                bookId: req.body.bookId,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                returned: false,
                extended: false
            });
            borrowBook.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    res.json({ "message": "ok" });
                }
            });
        };
        this.getAllBorrowedBooks = (req, res) => {
            let username = req.query.param;
            BorrowBook_1.default.find({ 'username': username }).sort({ endDate: -1 }).exec(function (err, books) {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.getBorrowSortName = (req, res) => {
            let username = req.query.param;
            BorrowBook_1.default.find({ 'username': username }).sort({ name: -1 }).exec(function (err, books) {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.getBorrowSortStart = (req, res) => {
            let username = req.query.param;
            BorrowBook_1.default.find({ 'username': username }).sort({ startDate: -1 }).exec(function (err, books) {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.getBorrowSortWriter = (req, res) => {
            let username = req.query.param;
            BorrowBook_1.default.find({ 'username': username }).sort({ writer: 1 }).exec(function (err, books) {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.getAllBorrowBooks = (req, res) => {
            let username = req.query.param;
            BorrowBook_1.default.find({ 'username': username, 'returned': false }, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.updateBorrowBook = (req, res) => {
            let username = req.body.username;
            let bookId = req.body.bookId;
            let startDate = req.body.startDate;
            let endDate = req.body.endDate;
            let extended = true;
            // let objectIdArray=Array.prototype.map(_id=>mongoose.Types.ObjectId);
            BorrowBook_1.default.updateOne({ 'username': username, 'bookId': bookId }, { $set: { 'startDate': startDate, 'endDate': endDate, 'extended': extended } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.returnBorrowBook = (req, res) => {
            let username = req.body.username;
            let bookId = req.body.bookId;
            let returned = true;
            // let objectIdArray=Array.prototype.map(_id=>mongoose.Types.ObjectId);
            BorrowBook_1.default.updateOne({ 'username': username, 'bookId': bookId, 'returned': false }, { $set: { 'returned': returned } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
    }
}
exports.BorrowBookController = BorrowBookController;
//# sourceMappingURL=borrowBook.controller.js.map