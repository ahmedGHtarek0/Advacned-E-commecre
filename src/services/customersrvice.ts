import { CustomerModleProducts } from "../Database/Custromermodel"
import { FilterDb } from "../Database/filtercomponents"

interface addp{
    title:string,
    price:number,
    stock:number,
    filter:string,
    id:string
}
export const addprodcuts=async({title,price,stock,filter,id}:addp)=>{
    const searchaboutfilter = await FilterDb.findOne({NameOfFilter:filter})
    if(!searchaboutfilter){
        return('the filter dosnot init :(')
    }
    const addprodcuts= await CustomerModleProducts.create({title,price,stock,filter,customerid:id})
   await addprodcuts.save()
   return(addprodcuts)
}
interface delp{
    id:string
}
export const deleteproducts=async({id}:delp)=>{
    const searchaboutproductsrodelete= await CustomerModleProducts.findByIdAndDelete(id)
    return("deleted")
}
interface Updpro{
    title:string,
    price:number,
    stock:Number,
    filter:string,
id:string
}
export const udpateproducst=async({title,price,stock,filter,id}:Updpro)=>{
    const searchaboutfilter=await FilterDb.findOne({NameOfFilter:filter})
    if(!searchaboutfilter){
        return('the filter dosnot init')
    }
    const searchaboutproductsroupdate:any= await CustomerModleProducts.findOne({_id:id})
    if(!searchaboutproductsroupdate){
        return('the id  was wrong ')
    }
    const udp= await CustomerModleProducts.updateOne({_id:id},{$set:{title:title,price:price,stock:stock,filter:filter}})
    return(udp)
}
