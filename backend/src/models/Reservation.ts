import { ObjectID } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Reservation = new Schema(
    {
        
        username:{
            type:String
        },
        book_id:{
            type:ObjectID
        },
        ticket:{
            type:Number
        },
        done:{
            type:Boolean
        }

    }
)

export default mongoose.model('ReservationModel', Reservation, 'reservation');