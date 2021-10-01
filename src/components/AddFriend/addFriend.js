import { useEffect } from "react"
import { useHistory } from "react-router"
import { useLoggedUser } from "../../contexts/globalContext"
import AddFriendView from "./addFriendView"

const AddFriend = () => {

    const [user,setUser]= useLoggedUser()
    const history = useHistory()

    useEffect( async () => {
        if(!user?.username){
            if(!localStorage.getItem('user')){
                history.push('/badAuth')
            }
            setUser(localStorage.getItem('user'))
        }
    },[])

    return(
        <AddFriendView></AddFriendView>
    )
    
}

export default AddFriend