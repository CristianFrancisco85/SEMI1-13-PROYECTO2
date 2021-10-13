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

export const makePublication = async (username,textContent,image64) =>{
    return await fetch(`${URL_SERVER}/data/makePublication`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body:JSON.stringify({username,textContent,image64})
    })
    .then(res => res.json())
    .then(data => data)
}

export const getPersons = async (username) =>{
    return await fetch(`${URL_SERVER}/data/getPersons`,{
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

export const sendFriendRequest = async (username,friend) =>{
    return await fetch(`${URL_SERVER}/data/friendRequest`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body:JSON.stringify({username,friend})
    })
    .then(res => res.json())
    .then(data => data)
}

export const getFriendRequest = async (username) =>{
    return await fetch(`${URL_SERVER}/data/getfriendRequests`,{
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


export const acceptFriendRequest = async (username,friend) =>{
    return await fetch(`${URL_SERVER}/data/acceptFriendRequest`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body:JSON.stringify({username,friend})
    })
    .then(res => res.json())
    .then(data => data)
}

export const rejectFriendRequest = async (username,friend) =>{
    return await fetch(`${URL_SERVER}/data/rejectFriendRequest`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body:JSON.stringify({username,friend})
    })
    .then(res => res.json())
    .then(data => data)
}

export const getPublications = async (username) =>{
    return await fetch(`${URL_SERVER}/data/getPublications`,{
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

export const translatePublication = async (text) =>{
    return await fetch(`${URL_SERVER}/data/translatePublication`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body:JSON.stringify({text})
    })
    .then(res => res.json())
    .then(data => data)
}

export const areFriends = async (username1,username2) =>{
    return await fetch(`${URL_SERVER}/data/areFriends`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body:JSON.stringify({username1,username2})
    })
    .then(res => res.json())
    .then(data => data)
}







