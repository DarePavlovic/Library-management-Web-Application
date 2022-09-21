import express from 'express'
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import BorrowBook from '../models/BorrowBook'
import Book from '../models/Book'
export class BorrowBookController{

    addBorrowBook = (req:express.Request, res:express.Response)=>{
        var ObjectID = require('bson').ObjectID;
        var id  = new ObjectID();
        let borrowBook = new BorrowBook({
            username:req.body.username,
            bookId:req.body.bookId,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            returned:false,
            extended:false
        })
        

        borrowBook.save((err,resp)=>{
            
            if(err){
                console.log(err);
                res.status(400).json({'message':'error'});
            }
            else{ res.json({"message":"ok"})}
        })
    }

    getAllBorrowedBooks = (req:express.Request, res:express.Response)=>{
        
        let username = req.query.param;
        BorrowBook.find({'username':username}).sort({endDate:-1}).exec(function(err, books){
            if(err)console.log(err);
            else res.json(books);
        })
    }


    getBorrowSortName = (req:express.Request, res:express.Response)=>{
        
        let username = req.query.param;
        BorrowBook.find({'username':username}).sort({name:-1}).exec(function(err, books){
            if(err)console.log(err);
            else res.json(books);
        })
    }

    getBorrowSortStart = (req:express.Request, res:express.Response)=>{
        
        let username = req.query.param;
        BorrowBook.find({'username':username}).sort({startDate:-1}).exec(function(err, books){
            if(err)console.log(err);
            else res.json(books);
        })
    }

    getBorrowSortWriter = (req:express.Request, res:express.Response)=>{
        
        let username = req.query.param;
        BorrowBook.find({'username':username}).sort({writer:1}).exec(function(err, books){
            if(err)console.log(err);
            else res.json(books);
        })
    }


    getAllBorrowBooks = (req:express.Request, res:express.Response)=>{
        
        let username = req.query.param;
        BorrowBook.find({'username':username,'returned':false},(err, books)=>{
            if(err)console.log(err);
            else res.json(books);
        })
            
    }


    updateBorrowBook = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        let bookId=req.body.bookId;
        let startDate= req.body.startDate;
        let endDate= req.body.endDate;
        let extended = true;
        // let objectIdArray=Array.prototype.map(_id=>mongoose.Types.ObjectId);

        BorrowBook.updateOne({'username':username, 'bookId':bookId}, {$set:{'startDate':startDate, 'endDate':endDate, 'extended':extended}}, (err, resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }

    returnBorrowBook = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        let bookId=req.body.bookId;
        let returned=true;
        // let objectIdArray=Array.prototype.map(_id=>mongoose.Types.ObjectId);

        BorrowBook.updateOne({'username':username, 'bookId':bookId, 'returned':false}, {$set:{'returned':returned}}, (err, resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }


    getAllBorrowBooksByBookId = (req:express.Request, res:express.Response)=>{
        
        let book_id = req.query.param;
        BorrowBook.find({'bookId':book_id,'returned':false},(err, books)=>{
            if(err)console.log(err);
            else res.json(books);
        })
            
    }


}