import express from 'express'
import BookW from '../models/BookW';

export class BookWController{

    addBook = (req:express.Request, res:express.Response)=>{
        var ObjectID = require('bson').ObjectID;
        var id  = new ObjectID();
        let book = new BookW({
            _id:id,
            username:req.body.username,
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
        BookW.find({},(err, books)=>{
            if(err)console.log(err);
            else res.json(books);
        })
    }

    getBookByID = (req:express.Request, res:express.Response)=>{
        
        let id = req.query.param;
        BookW.findOne({'_id':id},(err, books)=>{
            if(err)console.log(err);
            else res.json(books);
        })
    }

    deleteBook = (req:express.Request, res:express.Response)=>{
        let _id = req.body._id;
        
        BookW.deleteOne({'_id':_id},(err,resp)=>{
            if(err)console.log(err);
            else res.json({'message':'ok'});
        })
    }



}