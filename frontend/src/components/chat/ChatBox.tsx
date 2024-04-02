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
  const logindata = useSelector((state:any) => state.auth.loginUser)
  const chatdata = useSelector((state:any) => state.chat.chatData)
  const chatdataStatus = useSelector((state:any) => state.chat.chatdataStatus)
  const [currUserId, setcurrUserId] = useState<number>(0)
  const [newMessage, setNewMessage] = useState('')
  const [messageStack, setMessageStack] = useState<string[]>([])
  
  console.log(profileDetails,"profileDetails")
  useEffect( ()=>{
     dispatch(getUserdata())
    socket.emit("setupUserID",{userID: localStorage.getItem('userID')})
    console.log("nice nice")

    socket.on('send-to-client', (data)=> {
      setMessageStack((prev) => [...prev, data.text] )
      console.log(data,"data received")
    })

  },[])





  function sendMessage(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(newMessage.trim() !== ''){
      setMessageStack((prev) => [...prev, newMessage] )
      socket.emit('message', { userID: currUserId, text: newMessage });
      console.log("in message")
      setNewMessage('');
    }
  }

  function handleID (userID:number) {
    setcurrUserId(userID)
  }
  return (
    <div className="chat_container">
        <div className="chatbox_left">
        {fetchStatus == 'succeeded' ? profileDetails.map((profile:any)=>(
          <div key={profile.id} className="chat_profile" onClick={() => handleID(profile.id)}>
            <div className="chat_img">
              {/* <img src="" alt="" /> */}
              <div className="chat_profile_img">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
            <div className="chat_profile_details">
            
              <div className="chat_name">
                <p>{profile.firstName + " " + profile.lastName}</p>
              </div>
                <div className="chat_recent_msg">
                smothing
              </div>
      
            </div>
          </div>
        
        )): null}
        </div>
        <div className="chatbox_right">
          <div className="chatbox_chat">
           {messageStack.map((m) => (
            <p style={{padding: "5px"}}>{m}</p>
           ))}
          </div>
          <div className="chatbox_msg">
               <form onSubmit={sendMessage}>
                <input  value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    className='chat_input' type="text" formAction='submit'/>
               </form>
               <div className="chatbox_msg_options">
                  <button>send</button>
               </div>
          </div>
        </div>

    </div>
  )
}

export default ChatBox