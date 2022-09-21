"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const Reservation_1 = __importDefault(require("../models/Reservation"));
class ReservationController {
    constructor() {
        this.addReservation = (req, res) => {
            let reservation = new Reservation_1.default({
                username: req.body.username,
                book_id: req.body.book_id,
                ticket: req.body.ticket,
                done: false
            });
            reservation.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    res.json({ "message": "ok" });
                }
            });
        };
        this.getAllReservation = (req, res) => {
            Reservation_1.default.find({ 'done': false }).sort({ ticket: 1 }).exec(function (err, comm) {
                if (err)
                    console.log(err);
                else
                    res.json(comm);
            });
        };
        this.getReservationByBookID = (req, res) => {
            let id = req.body.id;
            let username = req.body.username;
            Reservation_1.default.find({ 'username': username, 'book_id': id }).sort({ ticket: -1 }).exec(function (err, comm) {
                if (err)
                    console.log(err);
                else
                    res.json(comm);
            });
        };
        this.doneReservation = (req, res) => {
            let book_id = req.body.book_id;
            let username = req.body.username;
            Reservation_1.default.updateOne({ 'username': username, 'book_id': book_id }, { $set: { 'done': true } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.getTicket = (req, res) => {
            Reservation_1.default.findOne({ 'done': false }).sort({ ticket: -1 }).exec(function (err, comm) {
                if (err)
                    console.log(err);
                else
                    res.json(comm);
            });
        };
        this.getNext = (req, res) => {
            Reservation_1.default.findOne({ 'done': false }).sort({ ticket: 1 }).exec(function (err, comm) {
                if (err)
                    console.log(err);
                else
                    res.json(comm);
            });
        };
        this.getFromUser = (req, res) => {
            let searchParams = req.query.param;
            Reservation_1.default.find({ 'username': searchParams, 'done': true }).sort({ ticket: 1 }).exec(function (err, comm) {
                if (err)
                    console.log(err);
                else
                    res.json(comm);
            });
        };
    }
}
exports.ReservationController = ReservationController;
//# sourceMappingURL=Reservation.controller.js.map