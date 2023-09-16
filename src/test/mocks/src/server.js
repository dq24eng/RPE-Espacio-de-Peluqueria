import express from 'express';
import userRouter from './routers/users.router.js'; 
import productRouter from './routers/products.routers.js'

const PORT = 8080;
const app = express();

app.use('/mockingusers', userRouter)
app.use('/mockingproducts', productRouter)

app.listen(PORT, ()=>{
    console.log("Server up")
})