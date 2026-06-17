import { useState } from 'react'
import assets from '../assets/assets'
import { useAuth } from '../../context/AuthContext'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Login")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)
  const {login} = useAuth()
  const onSubmitHandler = (event)=>{
    event.preventDefault();
    if(currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }
    if(currState === "Sign up"){
      login("signup", {fullName, email, password, bio});
    } else {
      login("login", {email, password});
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-16 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl px-[5%]'>

      {/* Logo */}
      <img
        src={assets.logo_big}
        alt=""
        className='w-[min(35vw,320px)]'
      />

     <form onSubmit={onSubmitHandler}
  autoComplete='off'
  className={`w-full max-w-[380px] border border-gray-500 bg-white/8 backdrop-blur-xl text-white rounded-xl shadow-lg flex flex-col items-center ${
    currState === "Login"
      ? "py-7 gap-5"
      : "py-5 gap-4"
  }`}
>

        {/* Header */}
        <h2 className='w-[90%] mx-4 font-semibold text-3xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)} src=
          {assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
           }
          {/* <img
            src={assets.arrow_icon}
            alt=""
            className='w-5 cursor-pointer'
          /> */}
        </h2>

        {/* Full Name */}
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            name="full-name"
            autoComplete="off"
            placeholder="Full Name"
            required
            className='w-[90%] mx-4 pl-3 pr-3 py-2 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none'
            style={{ paddingLeft: '10px', paddingRight: '10px' }}
          />
        )}

        {/* Email */}
        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="fake-email"
              autoComplete="off"
              placeholder="Email Address"
              required
              className='w-[90%] mx-4 pl-3 pr-3 py-2 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none'
              style={{ paddingLeft: '10px', paddingRight: '10px' }}
            />

            {/* Password */}
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="fake-password"
              autoComplete="new-password"
              placeholder="Password"
              required
              className='w-[90%] mx-4 pl-3 pr-3 py-2 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none'
              style={{ paddingLeft: '10px', paddingRight: '10px' }}
            />
          </>
        )}

        {/* Bio */}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            placeholder="Short bio about you"
            required
            className='w-[90%] mx-4 pl-3 pr-3 py-2 border border-gray-500 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none'
            style={{ paddingLeft: '10px', paddingRight: '10px' }}
          />
        )}

        {/* Button */}
        <button
          type='submit'
          className='w-[90%] mx-4 py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer font-medium'
        >
          {currState === "Sign up"
            ? "Create Account"
            : "Login Now"}
        </button>

        {/* Terms */}
        <div className='w-[90%] mx-4 flex items-start gap-2 text-xs text-gray-400 mt-1'>
  <input type="checkbox" className='mt-1' />
  <p>Agree to the terms of use & privacy policy.</p>
</div>



      <div className='w-[90%] mx-4 pb-2'>
  {currState === "Sign up" ? (
    <p className='text-sm text-gray-600'>
      Already have an account?{" "}
      <span
        onClick={() => {
          setCurrState("Login");
          setIsDataSubmitted(false);
        }}
        className='font-medium text-violet-500 cursor-pointer'
      >
        Login here
      </span>
    </p>
  ) : (
    <p className='text-sm text-gray-600'>
      Create an account{" "}
      <span
        onClick={() => setCurrState("Sign up")}
        className='font-medium text-violet-500 cursor-pointer'
      >
        Click here
      </span>
    </p>
  )}
</div>
      </form>
    </div>
  )
}

export default LoginPage


