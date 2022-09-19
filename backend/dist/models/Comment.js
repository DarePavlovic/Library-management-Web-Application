"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Comment = new Schema({
    book_id: {
        type: bson_1.ObjectID
    },
    username: {
        type: String
    },
    grade: {
        type: String
    },
    commentS: {
        type: String
    },
    posted: {
        type: Date
    }
});
exports.default = mongoose_1.default.model('CommentModel', Comment, 'comments');
//# sourceMappingURL=Comment.js.map