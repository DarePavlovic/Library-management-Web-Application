"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Reservation = new Schema({
    username: {
        type: String
    },
    book_id: {
        type: bson_1.ObjectID
    },
    ticket: {
        type: Number
    },
    done: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('ReservationModel', Reservation, 'reservation');
//# sourceMappingURL=Reservation.js.map