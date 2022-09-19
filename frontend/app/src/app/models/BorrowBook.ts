import { OID } from "./Oid";

export class BorrowBook{
    username:string;
    bookId:Array<OID>;
    startDate:Date;
    endDate:Date;
    returned:boolean;
    extended:boolean;
}