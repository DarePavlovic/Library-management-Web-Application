import express from 'express'
import Reservation from '../models/Reservation';
import UserDatabase from '../models/Reservation';


export class ReservationController{

    addReservation = (req:express.Request, res:express.Response)=>{
        
        let reservation = new Reservation({
            
            username:req.body.username,
            book_id:req.body.book_id,
            ticket:req.body.ticket,
            done:false
        })
        

        reservation.save((err,resp)=>{
            
            if(err){
                console.log(err);
                res.status(400).json({'message':'error'});
            }
            else{ res.json({"message":"ok"})}
        })
    }

    getAllReservation = (req:express.Request, res:express.Response)=>{
        
        Reservation.find({'done':false}).sort({ticket:1}).exec(function(err, comm){
            if(err)console.log(err);
            else res.json(comm);
        })
    }

    getReservationByBookID = (req:express.Request, res:express.Response)=>{
        
        let id = req.body.id;
        let username = req.body.username;
        Reservation.find({'username':username,'book_id':id}).sort({ticket:-1}).exec(function(err, comm){
            if(err)console.log(err);
            else res.json(comm);
        })
    }

    doneReservation = (req:express.Request, res:express.Response)=>{
        let book_id = req.body.book_id;
        let username=req.body.username;
        
       
        Reservation.updateOne({'username':username, 'book_id':book_id}, {$set:{'done':true}},(err, resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }

    getTicket = (req:express.Request, res:express.Response)=>{
        
        Reservation.findOne({'done':false}).sort({ticket:-1}).exec(function(err, comm){
            if(err)console.log(err);
            else res.json(comm);
        })
    }

    getNext = (req:express.Request, res:express.Response)=>{
        
        Reservation.findOne({'done':false}).sort({ticket:1}).exec(function(err, comm){
            if(err)console.log(err);
            else res.json(comm);
        })
    }
    
    getFromUser = (req:express.Request, res:express.Response)=>{
        let searchParams = req.query.param;

        Reservation.find({'username':searchParams,'done':true}).sort({ticket:1}).exec(function(err, comm){
            if(err)console.log(err);
            else res.json(comm);
        })
    }

}