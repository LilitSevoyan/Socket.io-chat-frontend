import React from "react"
import Login from "../login/Login"

export default function ProvideRouter({Component}){
    const userLogin = localStorage.getItem("user")
  
    return(
        <div>
            {userLogin
                ?<Component/>
                :<Login/>
            }
        </div>
    )
}