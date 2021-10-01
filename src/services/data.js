import { URL_SERVER } from "./utils"

export const fetchProfileImage = async (username) =>{
    return await fetch(`${URL_SERVER}/data/imageProfile`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body:JSON.stringify({username})
    })
    .then(res => res.json())
    .then(data => data)
}

