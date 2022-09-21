import express from 'express';
import { ReservationController } from '../controllers/Reservation.controller';

const reservationRouter = express.Router();

reservationRouter.route('/addReservation').post(
    (req, res)=> new ReservationController().addReservation(req,res)
)
reservationRouter.route('/getAllReservation').get(
    (req, res)=> new ReservationController().getAllReservation(req,res)
)
reservationRouter.route('/getReservationByBookID').post(
    (req, res)=> new ReservationController().getReservationByBookID(req,res)
)
reservationRouter.route('/doneReservation').post(
    (req, res)=> new ReservationController().doneReservation(req,res)
)
reservationRouter.route('/getTicket').get(
    (req, res)=> new ReservationController().getTicket(req,res)
)
reservationRouter.route('/getNext').get(
    (req, res)=> new ReservationController().getNext(req,res)
)
reservationRouter.route('/getFromUser').get(
    (req, res)=> new ReservationController().getFromUser(req,res)
)


export default reservationRouter;
