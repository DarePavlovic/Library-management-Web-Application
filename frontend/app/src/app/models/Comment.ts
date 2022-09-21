import { Comm } from "./Comm";
import { OID } from "./Oid";

export class Comment{
    book_id:Array<OID>;
    username:string;
    grade:string;
    commentS:string;
    posted:Date;
    updated:boolean;
}