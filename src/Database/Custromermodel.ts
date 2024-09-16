import mongoose,{Schema,Document} from "mongoose";
interface Icustomer extends Document{
    image:string,
    title:string,
    price:number,
    stock:number,
    filter:string,
    sorting:number,
    customerid:string,
    payproduct:number
}
const SchemaOfCUStomer= new Schema<Icustomer>({
    image:{type:String,default:'anyimage'},
    title:{type:String,default:'anytitle',required:true},
    price:{type:Number,default:0,required:true},
    stock:{type:Number,default:0,required:true},
    filter:{type:String,required:true},
    sorting:{type:Number,default:0},
    customerid:{type:String,required:true},
    payproduct:{type:Number,required:true,default:0}
})
export const CustomerModleProducts= mongoose.model<Icustomer>('Allproducts',SchemaOfCUStomer)