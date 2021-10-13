const express = require('express')
const cors = require('cors')
const cognitoEndPoints = require("./auth")
const dataEndPoints = require("./data")
const dotenv = require('dotenv').config()
const http = require('http');
const uuid = require('uuid');
const port = process.env.PORT || 4000

const app = express()
app.use(cors({
    origin:'*',
    methods:'POST,GET'
}))
app.use(express.json({limit:'10mb'}))
app.use('/auth',cognitoEndPoints)
app.use('/data',dataEndPoints)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Listen on port ${port}`)
})

app.get("/",async (req, res) => {
  res.sendStatus(200)
})
  
//====================SOCKET-CHAT====================//

let sessions = []

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  },
})

//Requisitos para conectarse al socket
io.use((socket, next) => {
  
  const username = socket.handshake.auth.username
  if (!username) {
      return next(new Error("invalid username"))
  }

  socket.username = username
  socket.session= uuid.v4()
  sessions.every(item=>{
    if(item.username===username){
      socket.session=item.session
      return 
    }
  })
  next()
  
})

//Cuando un usuario se conecta se le regresa las lista de usuarios 
io.on("connection", (socket) => {
  const users = []
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      session:socket.session,
      username: socket.username,
    })
  }
  socket.emit("users", users)
})

//Se notifica a los demas usuarios del nuevo usuario
io.on("connection", (socket) => {

  socket.broadcast.emit("user connected",{
    userID: socket.id,
    session:socket.session,
    username: socket.username,
  })
  socket.join(socket.session)

  //Se notifica a los demas usarios cuando un usuario se desconecta
  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.id).allSockets()
    const isDisconnected = matchingSockets.size === 0
    if (isDisconnected) {
      socket.broadcast.emit("user disconnected", socket.id)
      sessions.push({username:socket.username,session:socket.session})
    }
  })

  //Se notifica el mensaje para un usuario en especifico
  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.session,
    })
  })

})


