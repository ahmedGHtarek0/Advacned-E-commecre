import mongoose,{Schema,Document} from "mongoose";
export interface IorderForRealcustomer {
    productimage:string,
    productstitle:string,
    unitprice:number,
    quantatiy:number
}
const schmeaforrealcustomerorder= new Schema<IorderForRealcustomer>({
    productimage:{type:String,required:true,default:''},
    productstitle:{type:String,required:true,default:''},
    unitprice:{type:Number,required:true,default:0},
    quantatiy:{type:Number,required:true,default:1},
})
interface Iorders extends Document{
    realcustomerid:string,
    cusomerid:string,
    order:IorderForRealcustomer[],
    totalAmount:number,

}
const Schemafororder= new Schema<Iorders>({
    realcustomerid:{type:String,default:''},
    cusomerid:{type:String,required:true},
    order:[schmeaforrealcustomerorder],
    totalAmount:{type:Number,default:0}
})
export const ORD= mongoose.model<Iorders>('Orderforemp',Schemafororder)