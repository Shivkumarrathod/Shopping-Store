import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDb from './config/db.js'

//Routers
import userRouter from './routes/userRoutes.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import uploadRoutes from './routes/uploadsRoute.js'
import orderRoutes from './routes/orderRoutes.js'
dotenv.config()
const port = process.env.PORT || 5000

connectDb()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname+'/uploads')))

app.use('/api/users',userRouter)
app.use('/api/category',categoryRoute)
app.use('/api/products',productRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/orders',orderRoutes)
app.get("/api/config/paypal",(req,res)=>{
    res.send({clientID:process.env.PAYPAL_CLIENT_ID})
})


app.listen(port,()=>console.log(`Server is connected at PORT ${port}`))