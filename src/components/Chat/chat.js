import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useLoggedUser } from "../../contexts/globalContext"
import socketIOClient from "socket.io-client";
import ChatView from "./chatView"
import { URL_SERVER } from "../../services/utils";
import { areFriends } from "../../services/data";
import { SocketContext } from "../../contexts/sockets";

const Chat = () => {

    const [user,setUser]= useLoggedUser()
    const history = useHistory()
    const [usersChat, setUsersChat] = useState([])
    const socket = useContext(SocketContext)
    const [selectedUser,setSelectedUser] = useState({})

    const handleErrorSocket = (err) => {
        if (err.message === "invalid username") {
          console.log(err.message)
        }
    }

    const handleUsers = (users) => {
        users.map( async (newuser) =>{
            await areFriends(user.username,newuser.username).then(res=>{
                newuser.messages=[]
                if(res.OK?.RESULT==1){
                    setUsersChat(oldArray => [...oldArray,newuser])
                }
            })
        })
    }

    const handleUserConnected = async (newuser) => {
        await areFriends(user.username,newuser.username).then(res=>{
            if(res.OK?.RESULT==1){
                newuser.messages=[]
                let exists = false
                usersChat.map(olduser =>{
                    if(olduser.username==newuser.username){
                        exists=true
                    }
                })
                if(!exists){
                    setUsersChat(oldArray => [...oldArray,newuser])
                }   
                
            }
        })
    }

    const handleUserDisconnected = async (disuser) => {
        setUsersChat(oldArray =>
            oldArray.filter(user =>{
                return user.userID != disuser
            })
        )
    }

    const handleMessage = ({ content, from }) => {
        let tempArr=JSON.parse(JSON.stringify(usersChat))
        tempArr.every(tempuser =>{
            if(tempuser.session===from){
                tempuser.messages = [...tempuser.messages,{content}]
                setSelectedUser(tempuser)
                return
            }
        })
        setUsersChat(tempArr)
    }

    useEffect( () => {

        socket.on("connect_error",handleErrorSocket)
        socket.on("users",handleUsers)
        socket.on("user connected",handleUserConnected)
        socket.on("user disconnected",handleUserDisconnected)
        socket.on("private message",handleMessage)

        return () => {
            socket.off("connect_error",handleErrorSocket)
            socket.off("users",handleUsers)
            socket.off("user connected",handleUserConnected)
            socket.off("user disconnected",handleUserDisconnected)
            socket.off("private message",handleMessage)
        }

    },[usersChat])

    useEffect( () => {

        socket.auth = {username:user.username}
        socket.connect()

        return () => {
            socket.disconnect()
        }

    },[])

    const sendMessage = (event,session) => {
        event.preventDefault()
        let formData = new FormData(event.target)
        let content = formData.get('message')

        socket.emit("private message", {
            content,
            to: session,
        })

        let tempArr=JSON.parse(JSON.stringify(usersChat))
        tempArr.every(tempuser =>{
            if(tempuser.session===session){
                tempuser.messages = [...tempuser.messages,{content,mine:true}]
                setSelectedUser(tempuser)
                return
            }
        })
        setUsersChat(tempArr)
    }

    return(
        <ChatView
        usersChat={usersChat}
        sendMessage={sendMessage}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        ></ChatView>
    )
    
}

export default Chat