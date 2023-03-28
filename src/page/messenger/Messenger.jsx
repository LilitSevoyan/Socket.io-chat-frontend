import React,{useState,useEffect,useRef} from "react";
import Conversation from "../../component/conversations/Conversation";
import Message from "../../component/message/Message";
import ChatOnline from "../../component/ChatOnline/ChatOnline";
import {useNavigate} from "react-router-dom"
import { getLoginUserAction,getUsersAllAction,getMessengesAction,getConversationAction,postMessageAction} from "../../redux/actions/mainAction";
import { useDispatch, useSelector } from 'react-redux'
import {io} from "socket.io-client"
import axios from "axios";

export default function Messenger(){
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { conversation,user,messenger } = useSelector(state =>  state.main)
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("")
    const [getMessage, setGetMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
   
    const scrollRef = useRef()
    const  socket= useRef();

    useEffect(()=>{
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", (data) =>{
            console.log({messages, data})
            setGetMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now(),
            })
        })
    },[])

    useEffect(()=>{
        getMessage && currentChat?.members.includes(getMessage.sender) &&
        setMessages((prev)=>[...prev,getMessage])
        console.log(messages)
    },[getMessage,currentChat])

    useEffect(()=>{
       
       socket.current.emit("addUser",user?._id)
       socket.current.on("getUsers",(users) =>{
          //setOnlineUsers(user.followings.filter((f)=>users.some((u) =>u.userId === f)))
        console.log(users)
        
        })
    },[user])
 console.log(user)

    useEffect(()=>{
        dispatch(getUsersAllAction()) 
        dispatch(getLoginUserAction())
        
    },[dispatch])

    useEffect(() => {
        console.log({user}) 
        setMessages(messenger)
    }, [user,messenger])

    //const userID = users.map((arr)=>arr._id)
    
    //const followers = userid.followers
    //const FollowersID = userID.filter((e)=> {
    //   return followers?.indexOf(e) > -1 ? true:false 
    //})
    //const user = users.filter((arr)=> FollowersID?.indexOf(arr._id)> -1 ? true: false)
   
   
   
    const handleClick = async(e)=>{
        e.preventDefault()
        const message ={
            sender:user?._id,
            text:newMessage,
            conversationId: currentChat?._id
        }
        
        const receiverId  = currentChat.members.find((member) => member !== user?._id)
        console.log(currentChat)
        socket.current.emit("sendMessage",{
            senderId:user?._id,
            receiverId,
            text:newMessage
        })
        console.log(newMessage)
        try {
            console.log(message)
            const res = await axios.post("http://localhost:8088/messenges", message);
            // setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
        //dispatch(postMessageAction(message))
        //http://localhost:8080/messenges
        //setNewMessage("") 
    }

  

    const handleSubmit = () =>{ 
        localStorage.removeItem("user")
        navigate("/login")
    }

    useEffect(()=>{
        
        dispatch(getConversationAction(user._id))
        
    },[dispatch, user._id])

    useEffect(()=>{
       console.log(messages.map((m,i) =>m.sender === user._id))
       console.log({messages})
         
        
    },[messages, user?._id])



    useEffect(()=>{
       dispatch(getMessengesAction(currentChat?._id))
    },[currentChat, dispatch])
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);    
       
    return(
    <>
       <div className="messenger">
            <div className="chatMenu">
              <div className="chatMenuWrapper">
                <input placeholder="Search for friends" className="chatMenuInput" />
                {conversation.map((arr,i)=>(
                    <div  onClick={() => setCurrentChat(arr)} key={i}>
                        <Conversation  conversation={arr}  currentUser={user}/>
                    </div>
                ))}
              </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                {currentChat ? (
                    <>
                        <div className="chatBoxTop">
                            {messages.map((m,i) => (
                                <div key={i} ref={scrollRef}>
                                    <Message message={m} own={m?.sender === user._id} />
                                    
                                </div>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea
                                className="chatMessageInput"
                                placeholder="write something..."
                                name="msg"
                                onChange={(e)=> setNewMessage(e.target.value)}
                                value={newMessage}
                            ></textarea>
                            <button className="chatSubmitButton" onClick={handleClick}>Send</button>
                        </div>
                    </>
                    ):(
                        <span className="noConversationText">
                            Open a conversation to start a chat.
                        </span>
                    )}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline onlineUsers={onlineUsers} currentId={user._id} />
                </div>
            </div>
            <div className="logOut"onClick={handleSubmit}>
                <button >LogOut</button>
            </div>
       </div>
    
    </>
        
    )
}