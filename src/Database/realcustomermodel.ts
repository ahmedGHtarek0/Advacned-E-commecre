import mongoose,{Schema,Document} from "mongoose";
interface icart {
    productimage:string,
    productstitle:string,
    unitprice:number,
    quantatiy:number
    filter:string,
    customerid:string,
    productId:string
}
const Schemaforicart= new Schema<icart>({
    productimage:{type:String,required:true,default:'anyimaaaaage'},
    productstitle:{type:String,required:true,default:'titlecart'},
    unitprice:{type:Number,required:true,default:0},
    quantatiy:{type:Number,required:true,default:1},
    filter:{type:String,required:true,default:''},
    customerid:{type:String,required:true,default:''},
    productId:{type:String,required:true,default:''},
})
interface Irealcustomer extends Document{
    cart:icart[],
    totalAmount:number,
    realcustomerid:string,
    statuse:'active'|'completed'
}
const schmeaforrealcustomer= new Schema<Irealcustomer>({
    cart:[Schemaforicart],
    totalAmount:{type:Number,default:0},
    realcustomerid:{type:String,default:''},
    statuse:{type:String,default:"active"}
})
export const ReacustomerModel= mongoose.model<Irealcustomer>('Carts',schmeaforrealcustomer)