import axios from "axios"

export const getLoginUser = () =>{
    const user = localStorage.getItem("user")
    const AuthStr = 'Bearer '+ user; 
    return axios.get(`http://localhost:8088`,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization':AuthStr
            }
    })
    .then((response) => {
        return response.data
    })
    .catch(function (error) {
        if (error.response.status === 403 ){
            window.location = '/login'
            localStorage.removeItem("user")
         }
        console.log(error);
    }) 
}
export const getUsersAll = () =>{
    return axios.get(`http://localhost:8088/userall`)
    .then((response) => {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    })   
}

export const postLogin = (email,password)=>{
    return axios.post("http://localhost:8088/login",{
        email,
        password
    })
    .then((res) => {
        const userLogin =  res.data
        localStorage.setItem("user",userLogin.accessToken)  
    })
    .catch(function (error) {
        console.log(error);
    })   
    
}
export const getMessenges = (conversationId)=>{
   
    return axios.get(`http://localhost:8088/messenges/${conversationId}`)
    .then((response) => {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    })
}
export const getConversation = async (userid)=>{
    return await axios.get(`http://localhost:8088/conversation/${userid}`)
    .then((response) => {
        console.log(response.data)
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    })
}


//export const getUser = (userid)=>{
//    return axios.get(`http://localhost:8080/user/find/${userid}`)
//    .then((response) => {
//       // console.log(response.data)
//        return response.data
//    })
//    .catch(function (error) {
//        console.log(error);
//    })
//}

export const postMessage = (message)=>{
    return axios.post("http://localhost:8088/messenges",{
        ...message
    })
    .then((response) => {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    })   
    
}