import { CustomerModleProducts } from "../Database/Custromermodel"
import { FilterDb } from "../Database/filtercomponents"
import { IorderForRealcustomer, OrdERforrealcustomermodle } from "../Database/OrderforRealcuetomer"
import { ORD } from "../Database/Ordersforcustoemr"
import { ReacustomerModel } from "../Database/realcustomermodel"
import { CustomerModel } from "../Database/usermodel"

interface activecart{
    idd:string
}
export const makeavtivecart=async({idd}:activecart)=>{
    const seacrhmakecart= await ReacustomerModel.findOne({realcustomerid:idd,statuse:'active'})
    if(!seacrhmakecart){
        const  makecart= await ReacustomerModel.create({realcustomerid:idd})
       await makecart.save()
       return(makecart)
    }
    return(seacrhmakecart)

}
interface addtocart{
    id:string
    makecart:any
}
export const addtoCart=async({id,makecart}:addtocart)=>{
    const serachaboutproduct:any= await CustomerModleProducts.findOne({_id:id})  
    const serachaboutproductincart=makecart.cart.find((p:any)=>p.productId==id)
    if(serachaboutproductincart){
        return("the item is already in the cart")
    }
makecart.cart.push({productimage:serachaboutproduct.image,productstitle:serachaboutproduct.title,unitprice:serachaboutproduct.price,filter:serachaboutproduct.filter,productId:id,customerid:serachaboutproduct.customerid})
await makecart.save()
makecart.totalAmount=0
const totalmoney=makecart.cart.find((p:any)=>{
    makecart.totalAmount+=p.unitprice*p.quantatiy
})
await makecart.save()
return(makecart)
}
interface delite{
    makecart:any,
    id:string
}
export const deleteItem=async({makecart,id}:delite)=>{
const deleteItems= makecart.cart.filter((p:any)=>{
    return(p.productId!==id)
})
makecart.cart=deleteItems
makecart.totalAmount=0;
makecart.cart.find((p:any)=>{
makecart.totalAmount+=p.unitprice*p.quantatiy
})
await makecart.save()
return(makecart)
}
interface clear{
    id:string
}
export const clearCart=async({id}:clear)=>{
    const  claercart= await ReacustomerModel.findOneAndDelete({realcustomerid:id})
    return("deleted")
}
interface getcart{
    id:string
}
export const getcartforuser=async({id}:getcart)=>{
    const getcarts= await ReacustomerModel.findOne({realcustomerid:id})
    return(getcarts)
}
interface updP{
    id:string,
    makecart:any,
    quantatiy:number
}
export const updateProdutc=async({id,makecart,quantatiy}:updP)=>{
    const Updquntatiy=makecart.cart.find((p:any)=>{
        if(p.productId===id){
            p.quantatiy=quantatiy
        }
    })
    makecart.totalAmount=0
    makecart.cart.find((p:any)=>{
        makecart.totalAmount+=p.unitprice*p.quantatiy
    })
    await makecart.save()
    return(makecart)
}
interface check{
    makecart:any
}
export const cheakout=async({makecart}:check)=>{
    const testrorder:IorderForRealcustomer[]=[]
    let testrordr:IorderForRealcustomer[]=[]

    for(const p of makecart.cart){
        const ord:any={
            productimage:p.productimage,
            productstitle:p.productstitle,
            unitprice:p.unitprice,
            quantatiy:p.quantatiy,
            customerid:p.customerid,
            statuse:'completed'
        }
        testrorder.push(ord)
        const secrhtotodos:any= await CustomerModleProducts.findOne({_id:p.productId})
        secrhtotodos.payproduct+=1
        secrhtotodos.stock-=p.quantatiy
        const serachaboutproduct=await CustomerModleProducts.findOneAndUpdate({_id:p.productId},{$set:{stock:secrhtotodos.stock,payproduct:secrhtotodos.payproduct}})
    }
const savedtaainorder= await OrdERforrealcustomermodle.create({realcustomerid:makecart.realcustomerid,order:testrorder,totalAmount:makecart.totalAmount})
    await savedtaainorder.save()
    let serchaboutcustomer:any
    let test=makecart.cart
    let Q=0
    
    // for (let i = 0; i < makecart.cart.length; i++) {
    //     const p = makecart.cart[i];
    //     console.log(p.productstitle); // Logs "Item 1" then "Item 2"
    // }
    
    for( const t of test ){

    serchaboutcustomer= await CustomerModel.findOne({_id:t.customerid})
    Q=0   
    let tataa=0;
    await makecart.save()
        for(let p of makecart.cart){
            tataa++;
           
            if(t.customerid===p.customerid&&p.unitprice!==-1){
                Q+=1;
            let ord:any={
                productimage:p.productimage,
                productstitle:p.productstitle,
                unitprice:p.unitprice,
                quantatiy:p.quantatiy
            }
            testrordr.push(ord)
            p.unitprice=-1;
        }
    }

    console.log(testrordr,tataa)
if(Q>0){
        let tt:any
        tt=0
        for(const g of testrordr){
          tt+=g.unitprice*g.quantatiy  
        }
        const addordersforemp =await ORD.create({realcustomerid:makecart.realcustomerid,cusomerid:serchaboutcustomer._id,order:testrordr,totalAmount:tt})
      await  addordersforemp.save()
      testrordr.length=0
    }
   
    }
    return(savedtaainorder)
}
interface fi{
    filter:string,
}
export const filterinG=async({filter}:fi)=>{
    const middlwarefofriltwername= await FilterDb.findOne({NameOfFilter:filter})
    if(!middlwarefofriltwername){
        return({data:"the name of filter isnot here",status:400})
    }
const secrh= await CustomerModleProducts.find({filter:filter}).sort({payproduct:1})//-1 from  1 to 0
return({data:secrh,status:200})
}
// productimage:string,
//     productstitle:string,
//     unitprice:number,
//     quantatiy:number
//     filter:string,
//     customerid:string,
//     productId:string