import express from 'express'
import { login, registeAdmin, registercustomer, registeremployees } from '../services/usersregandlog'
const route=express.Router()
route.post('/login',async(req,res)=>{
    const {email,password}=req.body
    const {data,statescode}= await login({email,password})
    res.status(statescode).send(data)
})
route.post('/register/admin',async(req,res)=>{
    const {name,email,password}=req.body
    const {data,statescode}= await registeAdmin({name,email,password})
    res.status(statescode).send(data)
})
route.post('/register/customer',async(req,res)=>{
    const {name,email,password}=req.body
    const {data,statescode}= await registercustomer({name,email,password})
    res.status(statescode).send(data)
})
route.post('/register/employees',async(req,res)=>{
    const {name,email,password}=req.body
    const {data,statescode}= await registeremployees({name,email,password})
    res.status(statescode).send(data)
})
export default route