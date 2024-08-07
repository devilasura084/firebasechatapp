
import { useRef, useState } from 'react'
import './App.css'
import Auth from './components/Auth'
import Cookies from 'universal-cookie';
import Chat from './components/Chat';
import Logout from './components/Logout';

function App() {
  const cookies=new Cookies();
  const  [isAuth,setIsAuth]=useState<string|boolean>(cookies.get("auth-token"))
  const [room,setRoom]=useState('');
  const roominput=useRef<HTMLInputElement>(null);
  if(!isAuth){
  return ( 
    <div className="flex items-center justify-center">
        <Auth
        setIsAuth={setIsAuth}
        />
    </div>
  )
  }

  return <div className='flex items-center justify-center flex-col gap-10'>{room?
    <div className='flex flex-col text-center gap-5'>
      <h1 className='text-5xl mt-4 font-bold text-blue-700'>You are in {room}</h1>
    <div>
      <Chat
      room={room}
      />
    </div>
    </div>:
    <div className='flex items-center flex-col mt-52 gap-4 border p-10 rounded-lg'>
    <label className='text-cyan-600 text-2xl'>
      Enter Room Name
    </label>
    <input className='border w-full h-10 rounded-md cursor-text indent-2 outline-cyan-600' ref={roominput} type="text" />
    <button className='bg-blue-600 w-full p-3 rounded-lg text-white hover:bg-blue-500 transition-all shadow-lg ' onClick={()=>{
      if(roominput.current && roominput.current.value.trim().length!==0)
      {
        setRoom(roominput.current.value)
      }
    }}>Enter Chat</button>
    </div>}
    <Logout
    setIsAuth={setIsAuth}
    setRoom={setRoom}
    />
    </div>
}

export default App
