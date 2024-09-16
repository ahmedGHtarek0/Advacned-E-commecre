import { NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { CustomerModel } from "../Database/usermodel";
export const middlewarecustomer=async(req:any,res:any,next:NextFunction)=>{
    const authorization = req.get('authorization')
    if(!authorization){
        res.status(400).send("the authoeization wasnot here Man !")
        return
    }
    const token=authorization.split(' ')[1]
    if(!token){
        res.status(400).send("the token wasnot here Man !") 
        return
    }
    jwt.verify(token,'CustomerJwt',async(err:any,payload:any)=>{
        if(err){
            res.status(400).send("the token wasnot  right !") 
           return
        }
        if(!payload){
            res.status(400).send("the payload wasnot  right !") 
            return
        }
        const customer= await CustomerModel.findOne({email:payload.email})
        req.customer=customer
        next()
    })
}