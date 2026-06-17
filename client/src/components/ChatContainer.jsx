import React, { useContext, useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import {formatMessageTime} from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, getMessages, sendMessage } = useContext(ChatContext)
  const { authUser, onlineUsers } = useAuth()
const scrollEnd = useRef()
const [input, setInput] = useState('');

// Handle sending a message
const handleSendMessage = async (e)=>{
  e.preventDefault();
  if(input.trim() === "") return null;
  await sendMessage({text: input.trim()});
  setInput("")
}

//Handle sending an image
const handleSendImage = async (e) =>{
  const file = e.target.files[0];
  if(!file || !file.type.startsWith("image/")){
    toast.error("select an image file")
    return;
  }
  const reader = new FileReader();
  reader.onloadend = async ()=>{
    await sendMessage({image: reader.result})
    e.target.value = ""
  }
  reader.readAsDataURL(file)
}
useEffect(()=>{
  if(selectedUser){
    getMessages(selectedUser._id)
  }
},[selectedUser])
useEffect(()=>{
if(scrollEnd.current && messages){
  scrollEnd.current.scrollIntoView({behavior: "smooth"})
}
},[messages])

  return selectedUser ? (
    <div className='h-full overflow-y-auto relative backdrop-blur-lg'>
        <div className='flex items-center gap-3 py-3 mx-6 border-b border-stone-500'> 
          <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-8 rounded-full' />
          <p className='flex-1 text-lg text-white flex items-center gap-2'>
            {selectedUser?.fullName}
            {onlineUsers.includes(selectedUser._id) && (
              <span className='w-2 h-2 rounded-full bg-green-500'></span>
            )}
          </p>
          <img onClick={()=>setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
          <img src={assets.help_icon} alt="" className='max-w-5 cursor-pointer' />
        </div>
        <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll pb-6' style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px' }}>
          {messages.map((msg, index) => {
            const isSender = msg.senderId === authUser?._id;
            return (
              <div key={index} className={`relative flex items-end gap-3 mb-8 ${isSender ? "justify-end pl-12" : "justify-start pr-12"}`}>
                {!isSender && (
                  <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-8 rounded-full mb-1' />
                )}
                
                {msg.image ? (
                  <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden' />
                ) : (
                  <p className={`p-3 max-w-[230px] md:text-sm font-light rounded-lg break-all bg-violet-500/30 text-white ${isSender ? "rounded-br-none" : "rounded-bl-none"}`}>{msg.text}</p>
                )}

                {isSender && (
                  <img src={authUser?.profilePic || assets.avatar_icon} alt="" className='w-8 rounded-full mb-1' />
                )}

                <p className={`absolute bottom-[-18px] text-gray-500 text-[8px] ${isSender ? "right-0" : "left-0"}`}>
                  {formatMessageTime(msg.createdAt)}

                </p>
              </div>
            );
          })}
          <div ref={scrollEnd}></div>
        </div>

<div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-transparent' style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '16px', paddingTop: '10px' }}>
  <div className='flex-1 h-14 flex items-center bg-gray-100/12 rounded-full' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
    <input
    onChange={(e)=> setInput(e.target.value)} value={input}
    onKeyDown={(e)=>e.key === "Enter" ? handleSendMessage(e) : null}
      type="text"
      placeholder="Send a message"
      className='flex-1 text-sm bg-transparent border-none outline-none text-white placeholder-gray-400'
      style={{ paddingLeft: '12px' }}
    />

    <input
    onChange={handleSendImage}
      type="file"
      id='image'
      accept='image/png, image/jpg'
      hidden
    />

    <label htmlFor='image' className='cursor-pointer flex items-center'>
      <img
        src={assets.gallery_icon}
        alt="Attach"
        className='w-5'
        style={{ marginRight: '8px' }}
      />
    </label>
  </div>

  <img
  onClick={handleSendMessage}
    src={assets.send_button}
    alt="Send"
    className='w-14 cursor-pointer flex-shrink-0'
    style={{ marginRight: '10px' }}
  />
</div>

    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
    <img src={assets.logo_icon} className='max-w-16' alt="" />
    <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer

