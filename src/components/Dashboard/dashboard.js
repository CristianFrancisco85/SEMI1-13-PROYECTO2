import {useEffect, useState} from "react"
import { useHistory } from "react-router"
import { useLoggedUser } from "../../contexts/globalContext"
import { getPublications } from "../../services/data"
import DashboardView from "./dashboardView"
import _ from 'lodash'

const Dashboard = () =>{

    const [user,setUser] = useLoggedUser()
    const [publications,setPublications]= useState([])
    const [filters,setFilters] = useState([])
    const [allTags,setAllTags]= useState([])
    const history = useHistory()

    useEffect( () => {

        if(!user?.username){
            if(!localStorage.getItem('user')){
                history.push('/badAuth')
            }
            setUser(localStorage.getItem('user'))
        }
        else{
            async function fetchData(){ 
                return await getPublications(user.username).then(res=>{
                    return res
                })
            }
            fetchData().then((res) =>{
                setPublications(res.OK)
                setAllTags([])
                let auxArr = []
                res.OK.map(item =>{
                    auxArr = [...auxArr,...item.etiquetas.split(',')]
                })
                auxArr=_.uniq(auxArr)
                setAllTags(auxArr)
            })
            
        }

    
    },[])

    const onChangeFilters = (filters) =>{
        setFilters(filters)
    }

    return(
        <DashboardView
        publications={publications}
        filters={filters}
        onChangeFilters={onChangeFilters}
        allTags={allTags}
        ></DashboardView>
    )
    
}

export default Dashboard