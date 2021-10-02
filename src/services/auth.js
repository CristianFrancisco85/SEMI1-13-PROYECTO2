import { URL_SERVER } from "./utils"

export const fetchSignUp = async (username,name,email,password,botmode,image64) =>{
    return await fetch(`${URL_SERVER}/auth/signUp`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body:JSON.stringify({username,name,email,password,botmode,image64})
    })
    .then(res => res.json())
    .then(data => data)
}

export const fetchSignIn = async (username,password,hash) =>{
    return await fetch(`${URL_SERVER}/auth/signIn`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body:JSON.stringify({username,password,hash})
    })
    .then(res => res.json())
    .then(data => data)
}

export const updateProfile = async (username,name,email,newPassword,password,botmode,image64) =>{
    return await fetch(`${URL_SERVER}/auth/update`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body:JSON.stringify({username,name,email,newPassword,password,botmode,image64})
    })
    .then(res => res.json())
    .then(data => data)
}

export const fetchFaceId = async (username,image64) =>{
    return await fetch(`${URL_SERVER}/auth/faceid`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body:JSON.stringify({username,image64})
    })
    .then(res => res.json())
    .then(data => data)
}