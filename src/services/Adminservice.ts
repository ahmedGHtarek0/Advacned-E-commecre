import { CustomerModleProducts } from "../Database/Custromermodel"
import { FilterDb } from "../Database/filtercomponents"
import { CustomerModel } from "../Database/usermodel"

interface filter{
    NameOfFilter:string
}
export const addfilternow=async({NameOfFilter}:filter)=>{
    const add = await FilterDb.create({NameOfFilter})
    await add.save()
    return(add)
}
interface delEm{
    id:string
}
export const getallfiltercomponents=async()=>{
        const getallfiltercomponent= await FilterDb.find()
        return(getallfiltercomponent)
}
export const deletetheemployees=async({id}:delEm)=>{
    const serchaboutcustomer= await CustomerModel.findByIdAndDelete(id)
    const deleteallproductsofthiscustomer = await CustomerModleProducts.deleteMany({customerid:id})
    return('deleted')
}
export const getallcustomer=async()=>{
    return await CustomerModel.find()
}