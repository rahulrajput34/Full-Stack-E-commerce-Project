// To create the server
import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App config
const app = express()
const port = process.env.PORT || 5000  // backend will start on this port number
connectDB() || console.log('DB is not connected')
connectCloudinary() || console.log('Cloudinary is not connected')

// middlewares
app.use(express.json())  // whatever request we get from frontend, we will parse it into json
app.use(cors())  // to allow cross origin requests

// API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


app.get('/', (req, res) => {
    res.send('API is working!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
