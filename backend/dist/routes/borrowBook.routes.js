"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrowBook_controller_1 = require("../controllers/borrowBook.controller");
const borrowBookRouter = express_1.default.Router();
borrowBookRouter.route('/addBorrowBook').post((req, res) => new borrowBook_controller_1.BorrowBookController().addBorrowBook(req, res));
borrowBookRouter.route('/getAllBorrowedBooks').get((req, res) => new borrowBook_controller_1.BorrowBookController().getAllBorrowedBooks(req, res));
borrowBookRouter.route('/getAllBorrowBooks').get((req, res) => new borrowBook_controller_1.BorrowBookController().getAllBorrowBooks(req, res));
borrowBookRouter.route('/returnBorrowBook').post((req, res) => new borrowBook_controller_1.BorrowBookController().returnBorrowBook(req, res));
borrowBookRouter.route('/updateBorrowBook').post((req, res) => new borrowBook_controller_1.BorrowBookController().updateBorrowBook(req, res));
borrowBookRouter.route('/getBorrowSortName').get((req, res) => new borrowBook_controller_1.BorrowBookController().getBorrowSortName(req, res));
borrowBookRouter.route('/getBorrowSortStart').get((req, res) => new borrowBook_controller_1.BorrowBookController().getBorrowSortStart(req, res));
borrowBookRouter.route('/getBorrowSortWriter').get((req, res) => new borrowBook_controller_1.BorrowBookController().getBorrowSortWriter(req, res));
exports.default = borrowBookRouter;
//# sourceMappingURL=borrowBook.routes.js.map