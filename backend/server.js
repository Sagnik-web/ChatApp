const app = require('express')()
const cors = require('cors')
const {Server} = require('socket.io')
const http = require('http').createServer(app)
const io = new Server(http,{
    cors:{
        origin:'*'
    }
})

let roomId = ''

io.on('connection',(socket)=>{
   socket.on('chat',(payload)=>{
       socket.join(payload.room)
       console.log(payload.room);
       roomId = payload.room
    //    io.to(payload.room).emit("msg", "Join Room")

   })

   socket.on("sendMsg",(data)=>{
       socket.to(roomId).emit("sendMsg",data)
   })

    socket.on('disconnet',()=>{
        console.log("Clint is now disconneted");
    })
})


http.listen(5000,()=>{
    console.log(`Server is running on port 5000...`);
})
