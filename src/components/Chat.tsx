import { useEffect, useRef, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../firebase-congif";
interface chatprops{
    room:string
}
const Chat = ({room}:chatprops) => {
    
    const [message,setmessage]=useState('');
    const messagesRef=collection(db,"messages")
    const [messages,setmessages]=useState<any>([]);
    const chatEndRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const queryMessages=query(messagesRef,where("room","==",room),orderBy('createdAr'))
        const unsubscribe=onSnapshot(queryMessages,(snapshot)=>{
            let messages:any=[]
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id:doc.id})
            })
            setmessages(messages);
        })
        return ()=>unsubscribe();
    },[])
    useEffect(()=>{
        if(chatEndRef.current){
            chatEndRef.current.scrollIntoView({behavior:'instant'})
        }
    },[messages])
    const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!message || message.trim().length===0)return;
        try {
            await addDoc(messagesRef,{
                text:message,
                createdAr:serverTimestamp(),
                user:auth.currentUser?.displayName,
                room:room
            })
            setmessage('');
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div className="">
        <div className=" h-[65svh] w-[70svw] flex flex-col gap-1 overflow-auto">
            {messages.map((data:any,index:number)=>(<div key={index} className="w-full ">
                {data.user===auth.currentUser?.displayName?<div className="text-cyan-700 text-left break-words max-w-[40%] ml-2 mr-auto">
                    {data.user}<div className="text-black">{data.text}</div>
                </div>:
                    <div className="text-red-400 text-right break-words text-wrap max-w-[40%] ml-auto mr-2 ">
                    {data.user}<div className="text-black">{data.text}</div>
                    </div>}
            </div>))}
            <div ref={chatEndRef}></div>
        </div>
        <form className="flex" onSubmit={handlesubmit} >
            <input className="border w-full h-10 rounded-s-md cursor-text indent-2 outline-cyan-600" value={message} onChange={(e)=>setmessage(e.target.value)} type="text" placeholder="Type here...." />
            <button className="bg-blue-600 p-2 w-20 text-white rounded-e-md hover:bg-blue-500 transition-all shadow-xl" type="submit">Send</button>
        </form>
    </div>
  )
}

export default Chat