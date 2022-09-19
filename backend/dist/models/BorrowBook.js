"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let BorrowBook = new Schema({
    username: {
        type: String
    },
    bookId: {
        type: bson_1.ObjectID
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    returned: {
        type: Boolean
    },
    extended: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('BorrowBookModel', BorrowBook, 'borrowBook');
//# sourceMappingURL=BorrowBook.js.map