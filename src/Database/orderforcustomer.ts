import mongoose,{Schema,Document} from "mongoose";
interface Ioredercust {
    productimage:string,
    productstitle:string,
    unitprice:number,
    quantatiy:number,
    realcustomerid:string
}
const scema= new Schema<Ioredercust>({
    productimage:{type:String,required:true,default:''},
    productstitle:{type:String,required:true,default:''},
    unitprice:{type:Number,required:true,default:0},
    quantatiy:{type:Number,required:true,default:1},
    realcustomerid:{type:String,default:''}
})
interface Ordeaa extends Document{
    ordafrobae:Ioredercust[],
    totalamount:number
}
const scemaa= new Schema<Ordeaa>({
    ordafrobae:[scema],
    totalamount:{type:Number}
})
export const OrderEmp= mongoose.model<Ordeaa>('OrderEmp',scemaa)