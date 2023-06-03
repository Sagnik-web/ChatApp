import './App.css';
import { useEffect, useState } from 'react';
import {io} from 'socket.io-client'

function App() {
  const [msg, setMsg] = useState('')
  const [myMsg, setMyMsg] = useState([])
  const [room, setRoom] = useState('')
  const [chat, setChat] = useState({msg:''})
  const socket = io('http://localhost:5000')
  // const chat =[]

  const join =()=>{
    socket.emit('chat',{room:room})
  }

  const sendData = (e)=>{
  
    socket.emit('sendMsg',{msg:msg})
    setMsg('')
  }

  socket.on('connection')
  useEffect(()=>{
    socket.on('sendMsg',async (data)=>{
      await setChat( {msg:data.msg})
      // chat.push({msg:data.msg})

    })
    // console.log([...chat]);

  })

  useEffect(()=>{
    setMyMsg([...myMsg, chat])
  },[chat])

  return (
    <>
      <h3>Chat App</h3>
      <input type="text" value={room} onChange={e=>setRoom(e.target.value)}/>
      <button type='button' onClick={()=>join()}>Join</button>
      <input type="text" value={msg} onChange={e=>setMsg(e.target.value)} />
      <button type='button' onClick={(e)=>sendData(e)}>Send</button>
      {myMsg.map((el,index)=>
        <p key={index}>{el.msg}</p>
      )}
      {/* {chat} */}
    </>
  );
}

export default App;
