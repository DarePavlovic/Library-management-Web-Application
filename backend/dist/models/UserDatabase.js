"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let UserDatabase = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    phone_number: {
        type: Number
    },
    email: {
        type: String
    },
    picture: {
        type: String
    },
    type: {
        type: String
    }
});
exports.default = mongoose_1.default.model('UserDatabaseModel', UserDatabase, 'userDatabase');
//# sourceMappingURL=UserDatabase.js.map