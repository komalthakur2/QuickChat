import {Navigate, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from "react-hot-toast"
import { useAuth } from '../context/AuthContext'
const App = () => {
  const {authUser, isCheckingAuth} = useAuth()

  if (isCheckingAuth && !authUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-black bg-[url('/bgImage.svg')] bg-ontain">
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/signup" /> } />
        <Route path='/login' element={!authUser ? <LoginPage defaultState="Login" /> : <Navigate to="/" />} />
        <Route path='/signup' element={!authUser ? <LoginPage defaultState="Sign up" /> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/signup" />} />
      </Routes>
    </div>
  )
}

export default App
