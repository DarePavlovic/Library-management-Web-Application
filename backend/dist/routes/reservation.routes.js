"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Reservation_controller_1 = require("../controllers/Reservation.controller");
const reservationRouter = express_1.default.Router();
reservationRouter.route('/addReservation').post((req, res) => new Reservation_controller_1.ReservationController().addReservation(req, res));
reservationRouter.route('/getAllReservation').get((req, res) => new Reservation_controller_1.ReservationController().getAllReservation(req, res));
reservationRouter.route('/getReservationByBookID').post((req, res) => new Reservation_controller_1.ReservationController().getReservationByBookID(req, res));
reservationRouter.route('/doneReservation').post((req, res) => new Reservation_controller_1.ReservationController().doneReservation(req, res));
reservationRouter.route('/getTicket').get((req, res) => new Reservation_controller_1.ReservationController().getTicket(req, res));
reservationRouter.route('/getNext').get((req, res) => new Reservation_controller_1.ReservationController().getNext(req, res));
reservationRouter.route('/getFromUser').get((req, res) => new Reservation_controller_1.ReservationController().getFromUser(req, res));
exports.default = reservationRouter;
//# sourceMappingURL=reservation.routes.js.map