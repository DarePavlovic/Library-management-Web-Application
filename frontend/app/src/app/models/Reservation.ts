import { OID } from "./Oid";

export class Reservation{
    book_id:Array<OID>;
    username:string;
    ticket:number;
    done:boolean;
}