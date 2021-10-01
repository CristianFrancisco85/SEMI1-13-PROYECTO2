import { useState } from 'react';
import { useLoggedUser } from '../../contexts/globalContext';
import { fetchSignIn, updateProfile } from '../../services/auth';
import { fetchProfileImage } from '../../services/data';
import { encodeBase64, URL_S3 } from '../../services/utils';
import EditProfileModalView from './editProfileView';

const EditProfileModal = (props) =>{

    const {setVisibleHandler,visibleProp} = props

    const [user,setUser] = useLoggedUser()
    const [userImage64,setUserImage64]=useState(undefined)
    const [loading,setLoading]=useState(false)

    const handleSubmit = async (event) =>{
        event.preventDefault()
        let formData = new FormData(event.target);
        setLoading(true)
        await updateProfile(user.username,formData.get('name'),formData.get('email'),formData.get('newpassword'),formData.get('password'),formData.get('botmode'),userImage64).then( async (res) =>{
            setLoading(false)
            if(res.resAttributes?.ERROR){
                alert(`Error al cambiar atributos : ${res.resAttributes.ERROR}`)
            }
            if(res.resPassword?.ERROR){
                alert(`Error al cambiar contraseña : ${res.resPassword.ERROR}`)
            }
            if(res.resProfileImage?.ERROR){
                alert(`Error al cambiar imagen de perfil : ${res.resProfileImage.ERROR}`)
            }
            if(res.ERROR){
                alert(`Error: ${res.ERROR}`)
                return
            }
            else{
                alert('Datos editados exitosamente')
                setVisibleHandler(false)
            }
            let userData
            await fetchSignIn(user.username,formData.get('password')).then( async (res) =>{
                if(res.OK){
                    userData=res.OK
                    userData.username=user.username            
                    await fetchProfileImage(user.username).then((url)=>{
                        userData.image=URL_S3+url.OK
                    })
                    return true   
                }
                else if(res.ERROR){
                    alert(`Error : ${res.ERROR}`)
                    return false
                }
            }).then((flag)=>{
                if(flag){
                    window.sessionStorage.setItem('user',JSON.stringify(userData))
                    setUser(userData)
                }
            })


        })
    }

    const handleUploadFile = async (event) =>{
        if(event.target.files[0]){
            await encodeBase64(event.target.files[0]).then(res =>{
                setUserImage64(res)
            })
        }
    }

    return(
        <EditProfileModalView
        visibleProp={visibleProp}
        setVisibleHandler={setVisibleHandler}
        handleSubmit={handleSubmit}
        handleUploadFile={handleUploadFile}
        loading={loading}
        ></EditProfileModalView>
    )


}

export default EditProfileModal