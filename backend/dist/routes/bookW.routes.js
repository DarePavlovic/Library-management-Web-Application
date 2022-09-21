"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookW_controller_1 = require("../controllers/bookW.controller");
const bookWRouter = express_1.default.Router();
bookWRouter.route('/addBook').post((req, res) => new bookW_controller_1.BookWController().addBook(req, res));
bookWRouter.route('/getAllBooks').get((req, res) => new bookW_controller_1.BookWController().getAllBooks(req, res));
bookWRouter.route('/deleteBook').post((req, res) => new bookW_controller_1.BookWController().deleteBook(req, res));
bookWRouter.route('/getBookByID').get((req, res) => new bookW_controller_1.BookWController().getBookByID(req, res));
exports.default = bookWRouter;
//# sourceMappingURL=bookW.routes.js.map