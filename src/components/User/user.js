import { useLoggedUser } from "../../contexts/globalContext"
import { sendFriendRequest } from "../../services/data"
import UserView from "./userView"

const User = (props) =>{

    const userData= props.data
    const [user,setUser] = useLoggedUser()

    const handleAddFriend = async (friend)=>{
        await sendFriendRequest(user.username,friend).then(res=>{
            if(res.OK){
                alert('OK')
            }
            else{
                alert("EROR"+res.ERROR)
            }
        })
    }

    return(
        <UserView
        userData={userData}
        handleAddFriend={handleAddFriend}
        ></UserView>
    )
}

export default User