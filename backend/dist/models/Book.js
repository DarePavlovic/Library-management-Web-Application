"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Book = new Schema({
    idBook: {
        type: Number
    },
    name: {
        type: String
    },
    writer: {
        type: (Array)
    },
    style: {
        type: (Array)
    },
    publisher: {
        type: String
    },
    year: {
        type: Number
    },
    language: {
        type: Number
    },
    picture: {
        type: String
    }
});
exports.default = mongoose_1.default.model('BookModel', Book, 'book');
//# sourceMappingURL=Book.js.map