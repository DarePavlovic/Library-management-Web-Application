import express from 'express'
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import Book from '../models/Book'
export class BookController{

    addBook = (req:express.Request, res:express.Response)=>{
        var ObjectID = require('bson').ObjectID;
        var id  = new ObjectID();
        let book = new Book({
            _id:id,
            name:req.body.name,
            writer:req.body.writer,
            style:req.body.style,
            publisher:req.body.publisher,
            year:req.body.year,
            language:req.body.language,
            picture:req.body.picture,
            number:req.body.number,
            taken:0
        })
        

        book.save((err,resp)=>{
            
            if(err){
                console.log(err);
                res.status(400).json({'message':'error'});
            }
            else{ res.json({"message":"ok"})}
        })
    }

    getAllBooks = (req:express.Request, res:express.Response)=>{
        Book.find({},(err, books)=>{
            if(err)console.log(err);
            else res.json(books);
        })
    }

    getBookByID = (req:express.Request, res:express.Response)=>{
        
        let id = req.query.param;
        Book.findOne({'_id':id},(err, books)=>{
            if(err)console.log(err);
            else res.json(books);
        })
    }


    updateBook = (req:express.Request, res:express.Response)=>{
        let _id = req.body._id;
        let name=req.body.name;
        let writer= req.body.writer;
        let style= req.body.style;
        let publisher = req.body.publisher;
        let year = req.body.year;
        let language = req.body.language;
        let picture =  req.body.picture;
        let number=req.body.number;
        // let objectIdArray=Array.prototype.map(_id=>mongoose.Types.ObjectId);

        Book.updateOne({'_id':_id}, {$set:{'name':name, 'writer':writer, 'style':style,"publisher":publisher,
    'year':year, 'language':language, 'picture':picture, 'number':number}}, (err, resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }
    takeBook = (req:express.Request, res:express.Response)=>{
        let _id = req.body._id;
        
        let number=req.body.number;
        let taken = req.body.taken;
        Book.updateOne({'_id':_id}, {$set:{'number':number, 'taken': taken}}, (err, resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }

    returnBook = (req:express.Request, res:express.Response)=>{
        let _id = req.body._id;
        
        let number=req.body.number;
        Book.updateOne({'_id':_id}, {$set:{'number':number}}, (err, resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }


    deleteBook = (req:express.Request, res:express.Response)=>{
        let _id = req.body._id;
        
        Book.deleteOne({'_id':_id},(err,resp)=>{
            if(err)console.log(err);
            else res.json({'message':'ok'});
        })
    }

    searchBookByName = (req:express.Request, res:express.Response)=>{
        let searchParams = req.query.param;

        Book.find({'name': {$regex:searchParams}}, (err,books)=>{
            if(err)console.log(err)
            else res.json(books)
        })
    }
    searchBookByWriter = (req:express.Request, res:express.Response)=>{
        let searchParams = req.query.param;

        Book.find({'writer': {$regex:searchParams}}, (err,books)=>{
            if(err)console.log(err)
            else res.json(books)
        })
    }

    getBorrowSortName = (req:express.Request, res:express.Response)=>{
        
        Book.find({}).sort({name:1}).exec(function(err, books){
            if(err)console.log(err);
            else res.json(books);
        })
    }

    getBorrowSortWriter = (req:express.Request, res:express.Response)=>{
        
        Book.find({}).sort({writer:1}).exec(function(err, books){
            if(err)console.log(err);
            else res.json(books);
        })
    }
}