import { OID } from "./Oid";

export class JoinBook{
    _id:Array<OID>;;
    name:string;
    writer:Array<String>;
    startDate:Date;
    endDate:Date;
    picture:string;
    jos:number;
    extended:boolean;
}