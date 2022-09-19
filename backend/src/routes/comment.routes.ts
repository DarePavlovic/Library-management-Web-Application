import express from 'express';
import { CommentController } from '../controllers/comment.controller';

const commRouter = express.Router();

commRouter.route('/addComment').post(
    (req, res)=> new CommentController().addComment(req,res)
)
commRouter.route('/getAllCommentsByBookID').get(
    (req, res)=> new CommentController().getAllCommentsByBookID(req,res)
)
commRouter.route('/getCommentByBookID').post(
    (req, res)=> new CommentController().getCommentByBookID(req,res)
)


export default commRouter;