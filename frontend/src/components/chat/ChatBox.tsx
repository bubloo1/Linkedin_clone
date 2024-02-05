import { useEffect, useState } from 'react'
import './chatbox.css'
import {v4 as uuidV4 } from 'uuid'
import io, { Socket } from 'socket.io-client'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector,useDispatch } from 'react-redux'
import {getUserdata} from './chatSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'
const socket = io('http://localhost:3500')

// have to generate a uuid

const ChatBox = () => {
  const dispatch = useDispatch<ThunkDispatch<any,any,any>>()
  const profileDetails = useSelector((state:any)=>state.chat.chatuser)
  const fetchStatus = useSelector((state: any)=> state.chat.status)
  const [newMessage, setNewMessage] = useState('')

  console.log(profileDetails,"profileDetails")
  useEffect( ()=>{
     dispatch(getUserdata())
    console.log("in useEffect")
  },[])

  socket.on('send-to-client', (data)=> {
    console.log(data,"data received")
  })

  function sendMessage(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(newMessage.trim() !== ''){
      socket.emit('message', { user: 'You', text: newMessage });
      console.log("in message")
      setNewMessage('');
    }
  }
  return (
    <div className="chat_container">
        <div className="chatbox_left">
        {fetchStatus == 'succeeded' ? profileDetails.map((profile:any)=>(
          <div className="chat_profile">
            <div className="chat_img">
              {/* <img src="" alt="" /> */}
              <div className="chat_profile_img">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
            <div className="chat_profile_details">
            
              <div className="chat_name" key={profile.id}>{profile.username.slice(1,3)}</div>
                <div className="chat_recent_msg">
                smothing
              </div>
      
            </div>
          </div>
        
        )): null}
        </div>
        <div className="chatbox_right">
          <div className="chatbox_chat">
              sfgfg
          </div>
          <div className="chatbox_msg">
               <form onSubmit={sendMessage}>
                <input  value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    className='chat_input' type="text" formAction='submit'/>
               </form>
               <div className="chatbox_msg_options">
                  photos doc
               </div>
          </div>
        </div>

    </div>
  )
}

export default ChatBox