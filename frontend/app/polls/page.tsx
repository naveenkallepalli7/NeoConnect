"use client"

import { useEffect, useState } from "react"
import API from "../../services/api"
import Sidebar from "../../components/Sidebar"

export default function Polls(){

const [polls,setPolls] = useState([])

useEffect(()=>{
fetchPolls()
},[])

const fetchPolls = async()=>{
const res = await API.get("/polls")
setPolls(res.data)
}

const vote = async(id:string,index:number)=>{
await API.post("/polls/vote",{pollId:id,optionIndex:index})
fetchPolls()
}

return(

<div className="flex">

<Sidebar/>

<div className="p-10 w-full">

<h1 className="text-2xl font-bold mb-6">

Polls

</h1>

{polls.map((p:any)=>(
<div key={p._id} className="border p-4 mb-4">

<h3 className="font-bold">{p.question}</h3>

{p.options.map((opt:any,i:number)=>(
<button
key={i}
className="block bg-blue-500 text-white px-3 py-1 mt-2"
onClick={()=>vote(p._id,i)}
>
{opt} ({p.votes[i]})
</button>
))}

</div>
))}

</div>

</div>

)

}