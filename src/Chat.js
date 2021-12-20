import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from "@material-ui/core"
import { AttachFile, SearchOutlined } from "@material-ui/icons"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css'
import { useParams } from "react-router-dom";
import db from './firebase';
import firebase from "firebase";
import { useStateValue } from "./StateProvider"

function Chat() {

    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName
                (snapshot.data().name));

            db.collection('rooms')
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => 
                    doc.data()))
                );
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(
            Math.random() * 1000
        ))
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed >>>', input)

        db.collection('rooms').doc(roomId).collection
        ('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    }


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen ....</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${true && 'chat__receiver'}`}>
                        <span className="chat__name" style={{ color: `rgb(${red},${green},${blue})` }}>{message.name}</span>
                        <div className="msg__container">
                            <span className="chat__msg">{message.message}</span>
                            <span className="chat__timestamp">
                                { new Date(message.timestamp?.toDate
                                    ()).toUTCString() }
                            </span>
                        </div>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send a meassage</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
