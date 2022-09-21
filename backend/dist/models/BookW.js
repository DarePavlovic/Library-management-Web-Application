"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let BookW = new Schema({
    _id: {
        type: bson_1.ObjectID
    },
    username: {
        type: String
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
        type: String
    },
    picture: {
        type: String
    },
    number: {
        type: Number
    },
    taken: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('BookWModel', BookW, 'booksW');
//# sourceMappingURL=BookW.js.map