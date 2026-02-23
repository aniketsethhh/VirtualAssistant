import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios"
function SignIn() {
  const [showPassword,setShowPassword]=useState(false)
  const {serverUrl,userData,setUserData}=useContext(userDataContext)
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [loading,setLoading]=useState(false)
    const [password,setPassword]=useState("")
const [err,setErr]=useState("")
  const handleSignIn=async (e)=>{
    e.preventDefault()
    setErr("")
    setLoading(true)
try {
  let result=await axios.post(`${serverUrl}/api/auth/signin`,{
   email,password
  },{withCredentials:true} )
 setUserData(result.data)
  setLoading(false)
   navigate("/")
} catch (error) {
  console.log(error)
  setUserData(null)
  setLoading(false)
  setErr(error.response.data.message)
}
    }
 return (
  <div
    className="min-h-screen w-full bg-cover bg-center flex justify-center items-center px-4"
    style={{ backgroundImage: `url(${bg})` }}
  >
    <form
      className="w-[90%] max-w-[420px] bg-[#00000070] backdrop-blur-md 
      shadow-xl shadow-black flex flex-col items-center 
      justify-center gap-5 px-6 py-8 rounded-2xl"
      onSubmit={handleSignIn}
    >
      <h1 className="text-white text-2xl font-semibold mb-4 text-center">
        Sign In to <span className="text-blue-400">Virtual Assistant</span>
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <div className="w-full h-[50px] border-2 border-white bg-transparent text-white rounded-full relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-5"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {!showPassword && (
          <IoEye
            className="absolute top-3 right-5 w-5 h-5 text-white cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        )}
        {showPassword && (
          <IoEyeOff
            className="absolute top-3 right-5 w-5 h-5 text-white cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        )}
      </div>

      {err.length > 0 && (
        <p className="text-red-500 text-sm">*{err}</p>
      )}

      <button
        className="min-w-[150px] h-[50px] mt-3 text-black font-semibold bg-white rounded-full"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign In"}
      </button>

      <p
        className="text-white text-sm cursor-pointer"
        onClick={() => navigate("/signup")}
      >
        Want to create a new account ?{" "}
        <span className="text-blue-400">Sign Up</span>
      </p>
    </form>
  </div>
);
}

export default SignIn
