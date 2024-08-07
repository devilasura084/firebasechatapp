
import { signOut } from 'firebase/auth';
import Cookies from 'universal-cookie';
import { auth } from '../firebase-congif';
import { SetStateAction } from 'react';
interface logoutprops{
    setIsAuth:React.Dispatch<SetStateAction<string|boolean>>
    setRoom:React.Dispatch<SetStateAction<string>>
}
const Logout = ({setIsAuth,setRoom}:logoutprops) => {
    const cookie=new Cookies();
    const handleClick=async()=>{
    await signOut(auth)
    cookie.remove("auth-token");
    setIsAuth(false);
    setRoom('');
    }
  return (
    <button className='bg-blue-600 p-4 w-40 text-white rounded-lg hover:bg-blue-500 transition-all shadow-xl' onClick={handleClick}>Logout</button>
  )
}

export default Logout