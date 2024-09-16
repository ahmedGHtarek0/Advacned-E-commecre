import express from 'express'
import { MiddlewareRealcustoemr } from '../middleware/MiddlewareRealcustomer'
import { addtoCart, cheakout, clearCart, deleteItem, filterinG, getcartforuser, makeavtivecart, updateProdutc } from '../services/Realcustomerservices'
import { middlewarecustomer } from '../middleware/MiddlwareCustomer'
const route=express.Router()
route.post('/addtocart/:id',MiddlewareRealcustoemr,async(req:any,res)=>{
    const idd= req.real._id
    const {id}=req.params
    const makecart= await makeavtivecart({idd})
    const addtocart = await addtoCart({id,makecart})
    res.status(200).send(addtocart)
})
route.delete('/delete/:id',MiddlewareRealcustoemr,async(req:any,res)=>{
    const {id}=req.params
    const idd=req.real._id
    const makecart= await makeavtivecart({idd})
    const deleteitem= await deleteItem({makecart,id})
    res.status(200).send(deleteitem)
})
route.delete('/clearcart',MiddlewareRealcustoemr,async(req:any,res)=>{
    const id=req.real._id
    const claercarT= await clearCart({id})
    res.status(200).send(claercarT)
})
route.get('/getcart',MiddlewareRealcustoemr,async(req:any,res)=>{
    const id=req.real._id;
    const getcart=await getcartforuser({id})
    res.status(200).send(getcart)
})
route.put('/update/:id',MiddlewareRealcustoemr,async(req:any,res)=>{
    const {id}=req.params
    const idd=req.real._id
    const {quantatiy}=req.body
    const makecart= await makeavtivecart({idd})
    const udpateproduct= await updateProdutc({id,makecart,quantatiy})
    res.status(200).send(udpateproduct)
})
route.post('/checkout',MiddlewareRealcustoemr,async(req:any,res)=>{
    const idd=req.real._id
    const makecart= await makeavtivecart({idd})
    const checkout= await cheakout({makecart})
    res.status(200).send(checkout)
})
route.post('/filter',MiddlewareRealcustoemr,async(req:any,res)=>{
    const {filter}=req.body
    const {data,status}= await filterinG({filter})
    res.status(status).send(data)
})
export default route