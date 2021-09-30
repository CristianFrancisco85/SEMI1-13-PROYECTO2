import {useEffect} from "react"
import { useHistory } from "react-router"
import { useLoggedUser } from "../../contexts/globalContext"
import DashboardView from "./dashboardView"

const Dashboard = () =>{

    const [user,setUser] = useLoggedUser()
    const history = useHistory()

    useEffect(() => {
        if(!user){
            history.push('/badAuth')
        }
    },[])

    return(
        <DashboardView
        
        ></DashboardView>
    )
    
}

export default Dashboard