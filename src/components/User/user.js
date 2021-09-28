import { useLoggedUser } from "../../contexts/globalContext"
import UserView from "./userView"

const User = (props) =>{

    const userData= props.data
    const [user,setUser] = useLoggedUser()

    const handleAddFriend = async ()=>{

    }

    return(
        <UserView
        userData={userData}
        handleAddFriend={handleAddFriend}
        ></UserView>
    )
}

export default User