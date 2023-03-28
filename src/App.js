import React from 'react';
import './App.css';
import Messenger from './page/messenger/Messenger';
import Login from './page/login/Login'
import Register from './page/register/Register';
import {Routes,Route} from "react-router-dom";
import ProvideRouter from "./page/ProvideRouter/ProvideRouter"


export default function App(){
  //const [user,setUser]= useState("")
  //
  //useEffect(()=>{
  //  setUser(localStorage.getItem("user")) 
  //},[])
  


  return (
    <div className = "container">
      <Routes>
       
        <Route path ="/" element={<ProvideRouter Component={Messenger}/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/register" element={<Register/>}/>
      </Routes>
    </div>
  )
  
  
     
  
}
