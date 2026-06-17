import React, { useContext, useState, useEffect } from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  const {getUsers,users,selectedUser,setSelectedUser,unseenMessages, setUnseenMessages} = useContext(ChatContext);
  const {logout, onlineUsers} = useAuth();
  const [input, setInput] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users;
  return (
    <div
      className={`bg-[#8185B2]/10 h-full border-r border-gray-600/50 overflow-y-auto text-white flex flex-col gap-6 ${
        selectedUser ? "max-md:hidden" : ""
      }`}
      style={{ paddingTop: '24px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between items-center gap-3'>
          
          {/* Logo */}
          <img
            src={assets.logo}
            alt="logo"
            className='w-52 object-contain'
          />

          {/* Menu */}
          <div className="relative py-2 group flex-shrink-0">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className='max-h-5 cursor-pointer'
            />

            <div className='absolute right-0 top-full w-32 bg-[#282142] rounded-md p-2 hidden group-hover:block z-10'>
              <p
                onClick={() => navigate('/profile')}
                className='cursor-pointer text-sm p-2 hover:bg-gray-600 rounded'
              >
                Edit profile
              </p>

              <hr className="my-2 border-t border-gray-500" />

              <p onClick={()=> logout()} className='cursor-pointer text-sm p-2 hover:bg-gray-600 rounded'>
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {/* <div className='w-full bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'> */}
         <div className='w-full bg-[#282142] rounded-full flex items-center h-12' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <img
            src={assets.search_icon}
            alt="Search"
            className='w-3.5 flex-shrink-0'
          />

          <input
          onChange={(e)=>setInput(e.target.value)}
            type="text"
            className='w-full bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8]'
            placeholder='Search User...'
            style={{ paddingLeft: '12px' }}
          />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {setSelectedUser(user); setUnseenMessages(prev=>
               ({...prev, [user._id]:0}))}}
            key={index}
            className={`relative flex items-center gap-3 p-3 pl-4 rounded cursor-pointer max-sm:text-sm ${
              selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className='w-[35px] aspect-square rounded-full'
            />

            <div className='flex flex-col leading-5'>
              <p>{user.fullName}</p>

              {onlineUsers.includes(user._id)
                ? <span className='text-green-400 text-xs'>Online</span>
              :  <span className='text-neutral-400 text-xs'>Offline</span>
}
            </div>

            {unseenMessages[user._id] > 0  && (
              <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;