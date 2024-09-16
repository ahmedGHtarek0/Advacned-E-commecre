import mongoose,{Schema,Document} from "mongoose";
interface Iuser extends Document{
    name:string, 
    email:string, 
    password:string,   
}
const SchemaForUser= new Schema<Iuser>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})
export const AdminModel= mongoose.model<Iuser>('Admin',SchemaForUser)
export const CustomerModel= mongoose.model<Iuser>('Customer',SchemaForUser)
export const EmployeesModel= mongoose.model<Iuser>('Employees',SchemaForUser)