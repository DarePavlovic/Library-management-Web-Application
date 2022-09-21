"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controllers/comment.controller");
const commRouter = express_1.default.Router();
commRouter.route('/addComment').post((req, res) => new comment_controller_1.CommentController().addComment(req, res));
commRouter.route('/getAllCommentsByBookID').get((req, res) => new comment_controller_1.CommentController().getAllCommentsByBookID(req, res));
commRouter.route('/getCommentByBookID').post((req, res) => new comment_controller_1.CommentController().getCommentByBookID(req, res));
commRouter.route('/updateComment').post((req, res) => new comment_controller_1.CommentController().updateComment(req, res));
exports.default = commRouter;
//# sourceMappingURL=comment.routes.js.map