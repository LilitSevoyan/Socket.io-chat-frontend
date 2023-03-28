import React,{useEffect,useState} from "react";
import {UserImg} from "../assets"
import axios from "axios"

 export default function ChatOnline({onlineUsers,currentId}){
   
    const [friends,setFriends]= useState([])
    const [onlineFriends,setOnlineFriends] = useState([])
    useEffect(()=>{
        const getFriends = async ()=>{
            if(currentId){
                const res = await axios.get(`http://localhost:8088/user/friends/${currentId}`)
                setFriends(res.data)
            }
            
        }
        getFriends()
    },[currentId])
     //console.log(onlineUsers)

    useEffect(()=>{
        
        //const friendId = onlineUsers.map((arr) =>arr.userId).find((m) => m !== friends._id)
      
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    },[friends,onlineUsers])
    //console.log(onlineFriends.map(arr=>arr.username))
    return (
        <div className="chatOnline">
            
            
               
                <div className="chatOnlineFriend">
                    <div className="chatOnlineImgContainer">
                        <img className="chatOnlineImg" src={UserImg} alt=""/>
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="conversationName">{}</span>
                </div>
            
            
            
        </div>
    )
 }