import { useEffect } from "react"
import { useHistory } from "react-router"
import { useLoggedUser } from "../../contexts/globalContext"
import AddFriendView from "./addFriendView"

const AddFriend = () => {

    const [user,setuser]= useLoggedUser()
    const history = useHistory()

    useEffect(() => {
        if(!user){
            history.push('/badAuth')
        }
    },[])

    return(
        <AddFriendView></AddFriendView>
    )
    
}

export default AddFriend