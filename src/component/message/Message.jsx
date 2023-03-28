import React from "react";
import {UserImg} from "../assets"
import {format} from "timeago.js"
export default function Message({message,own}){
    
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={UserImg}
                    alt=""
                />
                <p className="messageText">{message.text} </p>

            </div>
            <div className="messageBottom">{format(message?.createdAt)}</div>
        </div>
    )
}