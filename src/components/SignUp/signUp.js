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
    const [takePhotoModal,setTakePhotoModal] = useState(false)

    let history =  useHistory()
    
    const handleSubmit = async (event) =>{
        event.preventDefault()
        let formData = new FormData(event.target);
        setLoading(true)

        if(!userImage64) return alert('Necesitas subir una foto')
        if(formData.get('password')!==formData.get('confirmpassword')) return alert('Las contraseñas no coinciden')

        let res = await fetchSignUp(formData.get('username'),formData.get('name'),formData.get('email'),formData.get('password'),'0',userImage64).then( res =>{
            if(res.OK){
                setLoading(false)
                alert('Usuario registrado exitosamente')
                return true
            }
            else if(res.ERROR){
                setLoading(false)
                alert(`Error : ${res.ERROR}`)
                return false
            }
        })
        if(res){
            history.push('/')
        }
        

    }

    const handleUpload = async (event) =>{
        if(event.target.files[0]){
            setUserImage(URL.createObjectURL(event.target.files[0]))
            await encodeBase64(event.target.files[0]).then(res =>{
                setUserImage64(res)
            })
        }
    }

    const handleCapture = (dataImage) =>{
        if(dataImage){
            let image = new Image().src=dataImage
            setUserImage(image)
            dataImage = dataImage.replace('data:image/png;base64,','')
            dataImage = dataImage.replace('data:image/jpeg;base64,','')
            setUserImage64(dataImage)
        }
    }

    return(
        <SignUpView
        userImage={userImage}
        handleSubmit={handleSubmit}
        handleUpload={handleUpload}
        handleCapture={handleCapture}
        loading={loading}
        takePhotoModal={takePhotoModal}
        setTakePhotoModal={setTakePhotoModal}
        ></SignUpView>
    )
}

export default SignUp
