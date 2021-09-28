import React, { useState } from 'react'
import userIcon from '../../images/userIcon.png'
import { useHistory } from "react-router"
import SignUpView from './signUpView'
import { encodeBase64 } from '../../services/utils'


const SignUp = () => {

    const [userImage,setUserImage] = useState(userIcon)
    const [userImage64,setUserImage64] = useState(undefined)
    let history =  useHistory()
    
    const handleSubmit = async (event) =>{
        event.preventDefault()
        let formData = new FormData(event.target);
        if(formData.password!==formData.confirmpassword) {alert('Las contraseñas no coinciden')}
    }

    const handleUpload = async (event) =>{
        setUserImage(URL.createObjectURL(event.target.files[0]))
        let base64= await encodeBase64(event.target.files[0])
        setUserImage64(base64)
    }

    return(
        <SignUpView
        userImage={userImage}
        handleUpload={handleSubmit}
        handleUpload={handleUpload}
        ></SignUpView>
    )
}

export default SignUp
