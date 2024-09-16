import { AdminModel, CustomerModel, EmployeesModel } from "../Database/usermodel"
import jwt from 'jsonwebtoken'
interface log{
    email:string,
    password:string
}
const genratjwtCus=(data:any)=>{
    return jwt.sign(data,'CustomerJwt')
}
const genratjwtemp=(data:any)=>{
    return  jwt.sign(data,'employeesjwt')
}
const genratjwtAdm=(data:any)=>{
    return jwt.sign(data,process.env.JWT_ADMIN||'')
}
export const login=async({email,password}:log)=>{
    const FindTheEmailInCustomer= await CustomerModel.findOne({email:email})
    if(FindTheEmailInCustomer){
       const Check= FindTheEmailInCustomer.password===password
       if(!Check){
        return({data:'the password is wrong' ,statescode:400})
       }
       else{
        return({data:genratjwtCus({name:FindTheEmailInCustomer.name,email,password}),statescode:200})
       }
    }
    const FindTheEmailInEmployees= await EmployeesModel.findOne({email:email})

    if(FindTheEmailInEmployees){
        const Check= FindTheEmailInEmployees.password===password
        if(!Check){
         return({data:'the password is wrong' ,statescode:400})
        }
        else{
         return({data:genratjwtemp({name:FindTheEmailInEmployees.name,email,password}),statescode:200})    
}
}
const FindTheEmailInAdmin= await AdminModel.findOne({email:email})
 if(FindTheEmailInAdmin){
    const Check= FindTheEmailInAdmin.password===password
    if(!Check){
     return({data:'the password is wrong' ,statescode:400})
    }
    else{
     return({data:genratjwtAdm({name:FindTheEmailInAdmin.name,email,password}),statescode:200})    
}
}
else {
    return({data:'this email is not in data base',statescode:400})
}
}
interface reg{
    name:string,
    email:string,
    password:string
}
export const registercustomer=async({name,email,password}:reg)=>{
    const serchaboutcustomer= await CustomerModel.findOne({email:email})
    if(serchaboutcustomer){
        return({data:"the user was alreday exsit",statescode:400})
    }
 const addcustomer= await CustomerModel.create({name,email,password})
 await addcustomer.save()   
 return({data:genratjwtCus({name,email,password}),statescode:200})
}
export const registeremployees=async({name,email,password}:reg)=>{
    const serchaboutcustomer= await EmployeesModel.findOne({email:email})
    if(serchaboutcustomer){
        return({data:"the user was alreday exsit",statescode:400})
    }
 const addemployees= await EmployeesModel.create({name,email,password})
 await addemployees.save()   
 return({data:genratjwtemp({name,email,password}),statescode:200})
}
export const registeAdmin=async({name,email,password}:reg)=>{
    const serchaboutcustomer= await AdminModel.findOne({email:email})
    if(serchaboutcustomer){
        return({data:"the user was alreday exsit",statescode:400})
    }
 const addAdmin= await AdminModel.create({name,email,password})
 await addAdmin.save()   
 return({data:genratjwtAdm({name,email,password}),statescode:200})
}
