import expres from 'express'
import { addprodcuts, deleteproducts, udpateproducst } from '../services/customersrvice'
import { middlewarecustomer } from '../middleware/MiddlwareCustomer'
const router=expres.Router()
router.post('/add',middlewarecustomer,async(req:any,res)=>{
    const {title,price,stock,filter}=req.body
    const id=req.customer._id
    const add = await addprodcuts({title,price,stock,filter,id})
    res.status(200).send(add)
})
router.delete('/delete/:id',middlewarecustomer,async(req:any,res)=>{
    const idd=req.customer._id
    const {id}=req.params
    const add = await deleteproducts({id})
    res.status(200).send(add)
})
router.put('/update/:id',middlewarecustomer,async(req:any,res)=>{
    const idd=req.customer._id
    const {title,price,stock,filter}=req.body
    const {id}=req.params
    const add = await udpateproducst({title,price,stock,filter,id})
    res.status(200).send(add)
})

export default router
