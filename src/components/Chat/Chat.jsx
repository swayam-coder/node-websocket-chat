import React, { useEffect, useState, useCallback } from 'react'
import io from "socket.io-client";
import "./Chat.css"
import queryString from "query-string";
import { User } from '../../contexts/UserContext';
import ReactEmoji from "react-emoji"
import AppBar from "../AppBar/AppBar"

let socket;

export default function Chat({ location }) {
    const [roomName, setRoomName] = useState("");
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState("");
    const [roominfo, setRoomInfo] = useState([])
    const { userCurrent } = User();
    const trimmeduser = userCurrent.trim().toLowerCase();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(message){
            socket.emit("sendMessage", message, () => setMessage(" "))
        }
    }

    useEffect(() => {
        const { name, room, id } = queryString.parse(location.search);

        setRoomName(room)
        setUserName(name)
        setRoomId(id)

        socket = io("http://localhost:5000");

        socket.emit("join", {room, name, id}, (error) => {
            if(error){
                alert(error);
            }
        });
    }, [queryString])

    useEffect(() => {
        socket.on("message", (m) => {
            setMessages([...messages, m])
        })

        socket.on("roomInfo", (info) => {
            setRoomInfo(info);       
        })
    }, [messages])

    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    // console.log(trimmeduser);

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 chatarea">
                <AppBar roominfo={roominfo}/>
                <div className="chatdisplay">
            <div style={{display: "flex", flexDirection: "column", overflow: "auto"}}>
                {messages.map((m, index) => {
                    const lastMessage = m.length - 1 === index;
                    return (
                        <div ref={lastMessage ? setRef : null} style={{alignSelf: `${(m.user === trimmeduser) ? "flex-end" : "flex-start"}`}}>
                            <div style={{margin: 10}}>
                                <div className={`${(m.user === trimmeduser) ? "mymessagebox" : "messagebox"}`}>{ReactEmoji.emojify(m.message)}</div>
                                <small style={{display: "block", textAlign: 'end'}}>{m.user}</small>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        <form className="input-group" style={{marginTop: "auto", padding: 15}} onSubmit={handleSubmit}>
            <textarea class="form-control chat-textArea" aria-label="With textarea" style={{resize: "none", border: "thin solid", borderWidth: "thin"}} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <button class="btn btn-primary sendbtn" type="submit">Send</button>
        </form>
                </div>
            </div>
        </div>
        </>
    )
}
