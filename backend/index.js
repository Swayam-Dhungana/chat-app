const express=require('express')
require('dotenv').config()
const connectMongo=require('./src/lib/db')
const cors=require('cors')
const {app, server, io}=require('./src/lib/socket')

app.use(express.json({limit: '50mb'}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
})) 


app.use('/api/auth',require('./src/routes/auth.route'))
app.use('/api/messages',require('./src/routes/message.route'))
connectMongo();
server.listen(5000,()=>{
    console.log('Server started at the port 5000')
})