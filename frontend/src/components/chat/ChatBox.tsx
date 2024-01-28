import { useEffect, useState } from 'react'
import './chatbox.css'
import {v4 as uuidV4 } from 'uuid'
import io, { Socket } from 'socket.io-client'

const socket = io('http://localhost:3500')

// have to generate a uuid

const ChatBox = () => {
  const [messages,setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    socket.on('connect',()=> {
      console.log("connected to server")
    })
  },[])

  function sendMessage(e: { preventDefault: () => void }){
    e.preventDefault()
    if(newMessage.trim() !== ''){
      socket.emit('message', { user: 'You', text: newMessage });
      console.log("in message")
      setNewMessage('');
    }
  }
  return (
    <div className="chat_container">
        <div className="chatbox_left">dfgf</div>
        <div className="chatbox_right">
          <div className="chatbox_container">
            <form action="" onSubmit={sendMessage}>
              <input  value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className='chat_input' type="text" />
            </form>
          </div>
        </div>
    </div>
  )
}

export default ChatBox