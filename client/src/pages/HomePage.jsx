import React,{ useContext, useState } from 'react'
import RightSidebar from '../components/RightSidebar'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {
  const {selectedUser} = useContext(ChatContext)

  return (
    <div className='w-full h-screen sm:px-[15%] sm:py-[5%]'>
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative ${
          selectedUser
            ? 'md:grid-cols-[350px_2fr_350px]'
            : 'md:grid-cols-[350px_1fr]'
        }`}
      >
        <Sidebar/>

        <ChatContainer/>

        <RightSidebar/>
      </div>
    </div>
  )
}

export default HomePage