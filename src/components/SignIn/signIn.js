import { useHistory } from "react-router"
import { useLoggedUser } from "../../contexts/globalContext"
import SignInView from "./signInView"

const SignIn = () => {

    let history =  useHistory()
    const [user,setUser] = useLoggedUser()

    const handleLogIn = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        /*await loginUser(formData.get('username'),formData.get('password')).then((res)=>{
        if(res.length==0){
            alert('Credenciales Invalidos')
        }
        else{
            console.log(res[0]);
            setUser(res[0])
            window.sessionStorage.setItem('user',JSON.stringify(res[0]))
            history.push('/dashboard')
        }})*/
    }

    return(
        <SignInView
        handleLogIn={handleLogIn}
        ></SignInView>
    )


}

export default SignIn