import mongoose from "mongoose";

const Schema = mongoose.Schema;

let UserDatabase = new Schema(
    {
        firstname:{
            type:String
        },
        lastname:{
            type:String
        },
        username:{
            type:String
        },
        password:{
            type:String
        },
        address:{
            type:String
        },
        phone_number:{
            type:Number
        },
        email:{
            type:String
        },
        picture:{
            type:String
        },
        type:{
            type:String
        }

    }
)

export default mongoose.model('UserDatabaseModel', UserDatabase, 'userDatabase');