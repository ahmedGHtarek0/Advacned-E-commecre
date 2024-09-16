import jwt from "jsonwebtoken"
import { AdminModel } from "../Database/usermodel"
import { NextFunction } from "express"
export const MiddlwareAdmin=async(req:any,res:any,next:NextFunction)=>{
 const authorizations = req.get('authorization')
   if(!authorizations){
    res.status(400).send("the authoeization wasnot here Man !")
    return
}
const token= authorizations.split(' ')[1]
if(!token){
    res.status(400).send("the token wasnot here Man !") 
    return
} 
jwt.verify(token,'AdminJwt',async(err:any,payload:any)=>{
if(err){
    res.status(400).send("the token wasnot  right !") 
    return
}
if(!payload){
    res.status(400).send("the payload wasnot  right !") 
    return
}
const Admin=await AdminModel.findOne({email:payload.email})
req.Admin=Admin
next()
})
}