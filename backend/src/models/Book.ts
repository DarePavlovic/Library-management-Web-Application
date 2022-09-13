import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Book = new Schema(
    {
        idBook:{
            type:Number
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
            type:Number
        },
        
        picture:{
            type:String  
        }
    }
)

export default mongoose.model('BookModel', Book, 'book');