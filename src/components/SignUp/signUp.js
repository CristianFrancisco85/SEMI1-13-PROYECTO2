import React, { useState } from 'react'
import userIcon from '../../images/userIcon.png'
import { useHistory } from "react-router"
import SignUpView from './signUpView'
import { encodeBase64 } from '../../services/utils'
import { fetchSignUp } from '../../services/auth'


const SignUp = () => {

    const [userImage,setUserImage] = useState(userIcon)
    const [userImage64,setUserImage64] = useState(undefined)
    const [loading,setLoading]=useState(false)
    let history =  useHistory()
    
    const handleSubmit = async (event) =>{
        event.preventDefault()
        let formData = new FormData(event.target);
        setLoading(true)

        if(!userImage64) return alert('Necesitas subir una foto')
        if(formData.get('password')!==formData.get('confirmpassword')) return alert('Las contraseñas no coinciden')

        await fetchSignUp(formData.get('username'),formData.get('name'),formData.get('email'),formData.get('password'),'0',userImage64).then( res =>{
            if(res.OK){
                alert('Usuario registrado exitosamente')
            }
            else if(res.ERROR){
                setLoading(false)
                alert(`Error : ${res.ERROR}`)
            }
        })
        if(loading){
            history.push('/')
        }
    }

    const handleUpload = async (event) =>{
        if(event.target.files[0]){
            setUserImage(URL.createObjectURL(event.target.files[0]))
            let base64 = await encodeBase64(event.target.files[0])
            setUserImage64(base64)
        }
    }

    return(
        <SignUpView
        userImage={userImage}
        handleSubmit={handleSubmit}
        handleUpload={handleUpload}
        loading={loading}
        ></SignUpView>
    )
}

export default SignUp
