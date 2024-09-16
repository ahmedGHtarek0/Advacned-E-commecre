import express from 'express'
import { addfilternow, deletetheemployees, getallcustomer, getallfiltercomponents } from '../services/Adminservice'
import { MiddlwareAdmin } from '../middleware/MiddlwareAdmin'
import route from './userlogandreg'
const router= express.Router()
router.post('/addFilter',MiddlwareAdmin,async(req,res)=>{
    const {NameOfFilter}=req.body
    const ADDdilter= await addfilternow({NameOfFilter})
    res.status(200).send(ADDdilter)
})
router.get('/getallfiltercomponents',MiddlwareAdmin,async(req,res)=>{
    const ADDdilter= await getallfiltercomponents()
    res.status(200).send(ADDdilter)
})
router.get('/getallcustomer',MiddlwareAdmin,async(req,res)=>{
    const ADDdilter= await getallcustomer()
    res.status(200).send(ADDdilter)
})
router.delete('/deleteEmployees/:id',MiddlwareAdmin,async(req,res)=>{
    const {id}=req.params
    const ADDdilter= await deletetheemployees({id})
    res.status(200).send(ADDdilter)
})

export default router