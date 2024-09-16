import mongoose,{Schema,Document} from "mongoose";
export interface IorderForRealcustomer {
    productimage:string,
    productstitle:string,
    unitprice:number,
    quantatiy:number
    customerid:string,
    statuse:'active'|'completed'
}
const schmeaforrealcustomerorder= new Schema<IorderForRealcustomer>({
    productimage:{type:String,required:true,default:''},
    productstitle:{type:String,required:true,default:''},
    unitprice:{type:Number,required:true,default:0},
    quantatiy:{type:Number,required:true,default:1},
    customerid:{type:String,required:true,default:''},
    statuse:{type:String,default:"completed"}
})
interface Iorders extends Document{
    realcustomerid:string,
    order:IorderForRealcustomer[],
    totalAmount:number,

}
const Schemafororder= new Schema<Iorders>({
    realcustomerid:{type:String,default:''},
    order:[schmeaforrealcustomerorder],
    totalAmount:{type:Number,default:0}
})
export const OrdERforrealcustomermodle= mongoose.model<Iorders>('Orderforealcustomer',Schemafororder)