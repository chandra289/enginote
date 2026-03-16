import {useState} from "react"
import axios from "axios"

export default function AIAssistant({subject}){

 const [msg,setMsg] = useState("")
 const [chat,setChat] = useState([])

 const ask = async()=>{

  const res = await axios.post(
   "http://localhost:5000/api/ai/chat",
   {message:msg,subject}
  )

  setChat([...chat,{q:msg,a:res.data.reply}])
  setMsg("")

 }

 return(

  <div className="fixed bottom-5 right-5 bg-black shadow-lg p-4 w-80">

   <h3>AI Tutor</h3>

   <div style={{height:"200px",overflow:"auto"}}>

    {chat.map((c,i)=>(
     <div key={i}>
      <b>You:</b> {c.q}<br/>
      <b>AI:</b> {c.a}
      <hr/>
     </div>
    ))}

   </div>

   <input
    value={msg}
    onChange={(e)=>setMsg(e.target.value)}
    placeholder="Ask question" 
   />

   <button onClick={ask}>Send</button>

  </div>

 )

}