"use client"

import { useEffect, useState } from "react"
import API from "../../services/api"
import Sidebar from "../../components/Sidebar"
import ComplaintTable from "../../components/ComplaintTable"

export default function Dashboard(){

const [complaints,setComplaints] = useState([])

const fetchComplaints = async()=>{

const res = await API.get("/complaints")

setComplaints(res.data)

}

useEffect(()=>{

fetchComplaints()

},[])

return(

<div className="flex">

<Sidebar/>

<div className="p-10 w-full">

<h1 className="text-2xl font-bold mb-6">

Complaints Dashboard

</h1>

<ComplaintTable
complaints={complaints}
refresh={fetchComplaints}
/>

</div>

</div>

)

}