import React, { useContext, useState, useEffect } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { useAuth } from '../../context/AuthContext'
const RightSidebar = () => {
  const {selectedUser, messages} = useContext(ChatContext)
  const {onlineUsers, logout} = useAuth()
  const [msgImages, setMsgImages] = useState([])
  //Get all the Images from messages and set them to state
  useEffect(()=>{
    setMsgImages(
      messages.filter(msg => msg.image).map(msg=>msg.image)
    )
  },[messages])

  return selectedUser && (
    <div 
      className={`bg-[#8185B2]/10 text-white w-full h-full flex flex-col justify-between ${selectedUser ? 'max-md:hidden' : ''}`}
      style={{ padding: '24px' }}
    >
        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto' style={{ paddingBottom: '16px' }}>
          <div className='pt-8 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
            <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-20 aspect-square rounded-full object-cover' />
            <h1 className='text-xl font-medium mx-auto flex items-center gap-2 text-center'>
              {onlineUsers.includes(selectedUser._id) && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
              {selectedUser.fullName}
            </h1>
            <p className='mx-auto text-center text-gray-300'>{selectedUser.bio}</p>
          </div>
          <hr className="border-[#ffffff30] my-4" />
          <div className="text-xs">
            <p className="text-gray-300 font-medium mb-3">Media</p>
            <div className='grid grid-cols-2 gap-3 opacity-90'>
              {msgImages.map((url, index)=>(
                <div key={index} onClick={()=> window.open(url)}
                className='cursor-pointer rounded overflow-hidden aspect-video'>
                  <img src={url} alt="" className='w-full h-full object-cover rounded-md'/>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Logout Button */}
        <div>
          <button onClick={()=> logout()}  className='w-full bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-base font-medium h-12 rounded-full cursor-pointer hover:opacity-95 transition-opacity'>
            Logout
          </button>
        </div>
    </div>
  )
}

export default RightSidebar