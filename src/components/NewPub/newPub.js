import { useState } from "react"
import { useLoggedUser } from "../../contexts/globalContext"
import { makePublication } from "../../services/data"
import { encodeBase64 } from "../../services/utils"
import NewPubView from "./newPubView"

const NewPub = (props) =>{

    const {setVisibleHandler,visibleProp} = props
    const [user,setUser] = useLoggedUser()
    const [image64,setImage64]= useState(undefined)

    const handleSubmit = async (event) =>{
        event.preventDefault()
        let formData = new FormData(event.target)
        if(!image64){
            alert('La foto es obligatoria')
            return
        }
        else{
            let res = await makePublication(user.username,formData.get('comment'),image64)
            if(res.OK){
                alert('Publicacion Hecha')
            } 
            else if(res.ERROR){
                alert('Error:'+res.ERROR)
            }
            else{
                alert('Sin respuesta de servidor')
            }
            setVisibleHandler(false)
        }

    }
    const handleUpload = async (event) =>{
        if(event.target.files[0]){
            await encodeBase64(event.target.files[0]).then(res =>{
                setImage64(res)
            })
        }
    }


    return(
        <NewPubView
        visibleProp={visibleProp}
        setVisibleHandler={setVisibleHandler}
        handleSubmit={handleSubmit}
        handleUpload={handleUpload}
        ></NewPubView>
    )

}

export default NewPub