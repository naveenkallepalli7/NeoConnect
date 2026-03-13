"use client"

import { useEffect, useState } from "react"
import API from "../../services/api"
import Sidebar from "../../components/Sidebar"

export default function AnalyticsPage(){

const [issues,setIssues] = useState<any[]>([])

useEffect(()=>{

fetchRecurringIssues()

},[])

const fetchRecurringIssues = async ()=>{

try{

const res = await API.get("/analytics/recurring")

setIssues(res.data)

}catch(error){

console.error(error)

}

}

return(

<div className="flex">

<Sidebar/>

<div className="p-10 w-full">

<h1 className="text-2xl font-bold mb-6">
Recurring Issues (Departments with 5+ Complaints)
</h1>

{issues.length === 0 ? (
<p>No recurring issues detected.</p>
) : (

<div className="space-y-4">

{issues.map((i)=>(
<div
key={i._id}
className="border p-4 rounded bg-yellow-100"
>

<strong>{i._id}</strong> has <strong>{i.count}</strong> complaints

</div>
))}

</div>

)}

</div>

</div>

)

}