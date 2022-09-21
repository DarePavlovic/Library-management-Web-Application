"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
class CommentController {
    constructor() {
        this.addComment = (req, res) => {
            let comment = new Comment_1.default({
                book_id: req.body.book_id,
                username: req.body.username,
                grade: req.body.grade,
                commentS: req.body.commentS,
                posted: req.body.posted,
                updated: false
            });
            comment.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    res.json({ "message": "ok" });
                }
            });
        };
        this.getAllCommentsByBookID = (req, res) => {
            let id = req.query.param;
            Comment_1.default.find({ 'book_id': id }).sort({ posted: -1 }).exec(function (err, comm) {
                if (err)
                    console.log(err);
                else
                    res.json(comm);
            });
        };
        this.getCommentByBookID = (req, res) => {
            let book_id = req.body.book_id;
            let user = req.body.user;
            Comment_1.default.findOne({ 'book_id': book_id, 'username': user }, (err, comm) => {
                if (err)
                    console.log(err);
                else
                    res.json(comm);
            });
        };
        this.updateComment = (req, res) => {
            let book_id = req.body.book_id;
            let username = req.body.username;
            let grade = req.body.grade;
            let commentS = req.body.commentS;
            let posted = req.body.posted;
            let updated = true;
            Comment_1.default.updateOne({ 'book_id': book_id, 'username': username }, { $set: { 'grade': grade, 'commentS': commentS,
                    'posted': posted, "updated": updated } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map