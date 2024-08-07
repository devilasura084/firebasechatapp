
import {auth,provider} from '../firebase-congif'
import { signInWithPopup } from 'firebase/auth'
import { SetStateAction } from 'react'
import Cookies from 'universal-cookie'
interface Authprops{
    setIsAuth:React.Dispatch<SetStateAction<string|boolean>>
}
const Auth = ({setIsAuth}:Authprops) => {
    const cookies=new Cookies();
    const SignInWithGoogle=async()=>{
        try {
            const response=await signInWithPopup(auth,provider);
            cookies.set('auth-token',response.user.refreshToken);
            setIsAuth(true)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div className='flex flex-col mt-52 gap-10'>
        <div className='text-cyan-600 text-2xl'>
            Sign In with Google To Continue
        </div>
        <button className='bg-blue-600 p-4 text-white rounded-lg hover:bg-blue-500 transition-all shadow-xl' onClick={SignInWithGoogle}>
            Sign in with Google
        </button>
    </div>
  )
}

export default Auth