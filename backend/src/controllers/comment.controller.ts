import express from 'express'
import Comment from '../models/Comment';

export class CommentController{

    addComment = (req:express.Request, res:express.Response)=>{
        
        let comment = new Comment({
            book_id:req.body.book_id,
            username:req.body.username,
            grade:req.body.grade,
            commentS:req.body.commentS,
            posted:req.body.posted,
            
        })
        

        comment.save((err,resp)=>{
            
            if(err){
                console.log(err);
                res.status(400).json({'message':'error'});
            }
            else{ res.json({"message":"ok"})}
        })
    }

    

    getAllCommentsByBookID = (req:express.Request, res:express.Response)=>{
        
        let id = req.query.param;
        Comment.find({'book_id':id}).sort({posted:-1}).exec(function(err, comm){
            if(err)console.log(err);
            else res.json(comm);
        })
    }

    getCommentByBookID = (req:express.Request, res:express.Response)=>{
        
        let book_id = req.body.book_id;
        let user = req.body.user;
        Comment.findOne({'book_id':book_id, 'username':user},(err, comm)=>{
            if(err)console.log(err);
            else res.json(comm);
        })
    }
}