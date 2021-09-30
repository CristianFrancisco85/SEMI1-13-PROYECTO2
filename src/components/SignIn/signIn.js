import { useEffect } from "react"
import { useHistory } from "react-router"
import { useLoggedUser } from "../../contexts/globalContext"
import { fetchSignIn } from "../../services/auth"
import SignInView from "./signInView"

const SignIn = () => {

    let history =  useHistory()
    const [user,setUser] = useLoggedUser()

    useEffect(() => {
        window.sessionStorage.removeItem('user')
        setUser(undefined)
    },[])

    const handleLogIn = async (event) => {
        event.preventDefault()
        let formData = new FormData(event.target);

        await fetchSignIn(formData.get('username'),formData.get('password')).then( res =>{
            if(res.OK){
                setUser(res.OK)
                window.sessionStorage.setItem('user',JSON.stringify(res.OK))
                history.push('/dashboard')
            }
            else if(res.ERROR){
                alert(`Error : ${res.ERROR}`)
            }
        })
    }

    return(
        <SignInView
        handleLogIn={handleLogIn}
        ></SignInView>
    )


}

export default SignIn