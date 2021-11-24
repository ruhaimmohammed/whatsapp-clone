import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from "@material-ui/core"
import { AttachFile, SearchOutlined } from "@material-ui/icons"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css'

function Chat() {

    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(
            Math.random() * 1000
        ))
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed >>>',input)

        setInput("");
    } 


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
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
                <p className={`chat__message ${true && 'chat__receiver'}`}>
                    <span className="chat__name" style={{ color: `rgb(${red},${green},${blue})`}}>Ruhaim</span>
                    <div className="msg__container">
                        <span className="chat__msg"> Hey Guys </span>
                        <span className="chat__timestamp">3:38 PM</span>
                    </div>
                </p>
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send a meassage</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
