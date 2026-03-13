"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Sidebar(){

const [role,setRole] = useState("")

useEffect(()=>{

const user = JSON.parse(localStorage.getItem("user") || "{}")

setRole(user.role)

},[])

return(

<div className="w-60 h-screen bg-gray-900 text-white p-5">

<h2 className="text-xl font-bold mb-6">
NeoConnect
</h2>

<nav className="flex flex-col gap-4">

{role==="staff" && (
<Link href="/complaint">Submit Complaint</Link>
)}

{(role==="admin" || role==="secretariat") && (
<Link href="/dashboard">Dashboard</Link>
)}

{role==="manager" && (
<Link href="/dashboard">Manager Panel</Link>
)}

<Link href="/analytics">Analytics</Link>

<Link href="/polls">Polls</Link>

<Link href="/publichub">Public Hub</Link>

</nav>

</div>

)

}