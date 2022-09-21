import { ObjectID } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Comment = new Schema(
    {
        book_id:{
            type:ObjectID
        },
        username:{
            type:String
        },
        grade:{
            type:String
        },
        commentS:{
            type:String
        },
        posted:{
            type:Date
        },
        updated:{
            type:Boolean
        }
    }
)

export default mongoose.model('CommentModel', Comment, 'comments');