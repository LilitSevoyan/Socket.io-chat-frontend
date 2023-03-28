import React,{useState,useEffect} from "react";
import {UserImg} from "../assets"
import axios from "axios"

export default function Conversation({conversation,currentUser}){
  //console.log(conversation,currentUser)
   
     const [user,setUser]= useState(null)
     
     useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);
        console.log({conversation,currentUser})
        const getUser = async () => {
          try {
            const res = await axios.get(`http://localhost:8088/user/find/${friendId}`);
            setUser(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [currentUser, conversation]);

    return (
        <>
          <div className="conversation" > 
              <img className="conversationImg" src={UserImg} alt=""/>
              <span className="conversationName">{user?.username}</span>
          </div>
        </>
    )
 }