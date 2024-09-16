import('dotenv/config')
import express from 'express'
import mongoose  from 'mongoose'
import userlogandreg from './route/userlogandreg';
import AdminRouter from './route/AdminRouter';
import CustomerRoute from './route/CustomerRoute';
import RealcustomerRoutes from './route/RealcustomerRoutes';
const app=express()
const port =3003;
mongoose
.connect("mongodb://localhost:27017/Advancedecommerce")
.then(()=> console.log("MongoDB connected !"))
.catch((err)=>console.log("faild to connect cause ", err))
app.use(express.json())//middleware built in express who cjange the json in the req and but in the req.body
app.use('/Goin',userlogandreg)
app.use('/Admin',AdminRouter)
app.use('/Customer',CustomerRoute)
app.use('/Cart',RealcustomerRoutes)
app.listen(port,()=>{
    console.log(`srever is ruunig at http://localhost:${port}`)
})