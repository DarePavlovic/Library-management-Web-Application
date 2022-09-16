import { ObjectID } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Book = new Schema(
    {
        _id:{
            type:ObjectID
        },
        name:{
            type:String
        },
        writer:{
            type:Array<String>
        },
        style:{
            type:Array<String>
        },
        publisher:{
            type:String
        },
        year:{
            type:Number
        },
        language:{
            type:String
        },
        
        picture:{
            type:String  
        },
        number:{
            type:Number
        },
        taken:{
            type:Number
        }
    }
)

export default mongoose.model('BookModel', Book, 'books');