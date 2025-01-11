const express=require('express')
require('dotenv').config()
const connectMongo=require('./src/lib/db')
const cors=require('cors')

const app=express()
connectMongo();
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./src/routes/auth.route'))
app.use('/api/messages',require('./src/routes/message.route'))

app.listen(5000,()=>{
    console.log('Server started at the port 5000')
})