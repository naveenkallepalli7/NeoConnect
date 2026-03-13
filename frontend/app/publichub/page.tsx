"use client"

import { useEffect, useState } from "react"
import API from "../../services/api"
import Sidebar from "../../components/Sidebar"

export default function PublicHub(){

const [data,setData] = useState([])

useEffect(()=>{

fetchData()

},[])

const fetchData = async()=>{

const res = await API.get("/complaints")

const resolved = res.data.filter((c:any)=>c.status === "Resolved")

setData(resolved)

}

return(

<div className="flex">

<Sidebar/>

<div className="p-10 w-full">

<h1 className="text-2xl font-bold mb-6">

Public Hub (Resolved Issues)

</h1>

<table className="w-full border">

<thead>

<tr className="bg-gray-200">

<th>Issue</th>
<th>Department</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{data.map((c:any)=>(
<tr key={c._id}>

<td>{c.category}</td>
<td>{c.department}</td>
<td>{c.notes}</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

)

}