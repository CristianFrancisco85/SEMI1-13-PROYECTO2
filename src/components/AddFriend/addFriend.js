import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useLoggedUser } from "../../contexts/globalContext"
import { getPersons } from "../../services/data"
import AddFriendView from "./addFriendView"

const AddFriend = () => {

    const [user,setUser]= useLoggedUser()
    const history = useHistory()
    const [persons,setPersons] = useState([])

    useEffect( async () => {
        if(!user?.username){
            if(!localStorage.getItem('user')){
                history.push('/badAuth')
            }
            setUser(localStorage.getItem('user'))
        }
        else{
            await getPersons(user.username).then(res=>{
                if(res.OK){
                    setPersons(res.OK)
                }
                else{
                    alert("EROR"+res.ERROR)
                }
            })
        }
    },[])

    return(
        <AddFriendView persons={persons}></AddFriendView>
    )
    
}

export default AddFriend