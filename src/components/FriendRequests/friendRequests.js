import { useEffect, useState } from "react"
import { useLoggedUser } from "../../contexts/globalContext"
import { acceptFriendRequest, getFriendRequest, rejectFriendRequest } from "../../services/data"
import FriendRequestsView from "./friendRequestsView"

const FriendRequest = (props) =>{

    const {setVisibleHandler,visibleProp} = props
    const [user,setUser] = useLoggedUser()
    const [requests,setRequests] = useState([])

    useEffect(async () =>{
        await getFriendRequest(user.username).then(res=>{
            if(res.OK){
                setRequests(res.OK)
            }
            else{
                alert("EROR"+res.ERROR)
            }
        })
    },[])

    const handleAccept = async (friend) =>{
        await acceptFriendRequest(user.username,friend).then(res=>{
            if(res.OK){
                alert('OK')
            }
            else{
                alert("EROR"+res.ERROR)
            }
            setRequests(oldArray => {
                return oldArray.filter(item=>{
                    return item.username!=friend
                })
            })
        })
    }

    const handleReject = async (friend) =>{
        await rejectFriendRequest(user.username,friend).then(res=>{
            if(res.OK){
                alert('OK')
            }
            else{
                alert("EROR"+res.ERROR)
            }
            setRequests(oldArray => {
                oldArray.filter(item=>{
                    return item.username!=friend
                })
            })
        })
    }

    return(
        <FriendRequestsView
        handleAccept={handleAccept}
        setVisibleHandler={setVisibleHandler}
        visibleProp={visibleProp}
        requests={requests}
        handleReject={handleReject}
        >
        </FriendRequestsView>
    )

}

export default FriendRequest