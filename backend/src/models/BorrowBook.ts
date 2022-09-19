import { ObjectID } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let BorrowBook = new Schema(
    {
        username:{
            type:String
        },
        bookId:{
            type:ObjectID
        },
        startDate:{
            type:Date
        },
        endDate:{
            type:Date
        },
        returned:{
            type:Boolean
        },
        extended:{
            type:Boolean
        }
    }
)

export default mongoose.model('BorrowBookModel', BorrowBook, 'borrowBook');