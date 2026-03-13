"use client"

import { useState } from "react"
import API from "../../services/api"
import Sidebar from "../../components/Sidebar"

export default function ComplaintPage(){

const [form,setForm] = useState({
category:"",
department:"",
location:"",
severity:"",
description:"",
anonymous:false
})

const [file,setFile] = useState<File | null>(null)

const submitComplaint = async(e:any)=>{

e.preventDefault()

try{

const formData = new FormData()

formData.append("category",form.category)
formData.append("department",form.department)
formData.append("location",form.location)
formData.append("severity",form.severity)
formData.append("description",form.description)
formData.append("anonymous",String(form.anonymous))

if(file){
formData.append("file",file)
}

const res = await API.post("/complaints",formData)

alert("Complaint submitted! Tracking ID: " + res.data.trackingId)

setForm({
category:"",
department:"",
location:"",
severity:"",
description:"",
anonymous:false
})

setFile(null)

}catch(error){

console.error(error)
alert("Error submitting complaint")

}

}

return(

<div className="flex">

<Sidebar/>

<div className="p-10 w-full">

<h1 className="text-2xl font-bold mb-6">
Submit Complaint
</h1>

<form onSubmit={submitComplaint} className="space-y-4">

<input
className="border p-2 w-full"
placeholder="Category"
value={form.category}
onChange={(e)=>setForm({...form,category:e.target.value})}
/>

<input
className="border p-2 w-full"
placeholder="Department"
value={form.department}
onChange={(e)=>setForm({...form,department:e.target.value})}
/>

<input
className="border p-2 w-full"
placeholder="Location"
value={form.location}
onChange={(e)=>setForm({...form,location:e.target.value})}
/>

<select
className="border p-2 w-full"
value={form.severity}
onChange={(e)=>setForm({...form,severity:e.target.value})}
>
<option value="">Select Severity</option>
<option>Low</option>
<option>Medium</option>
<option>High</option>
</select>

<textarea
className="border p-2 w-full"
placeholder="Description"
value={form.description}
onChange={(e)=>setForm({...form,description:e.target.value})}
/>

<label className="flex items-center gap-2">
<input
type="checkbox"
checked={form.anonymous}
onChange={(e)=>setForm({...form,anonymous:e.target.checked})}
/>
Submit Anonymously
</label>

<input
type="file"
className="border p-2 w-full"
onChange={(e)=>setFile(e.target.files?.[0] || null)}
/>

<button className="bg-blue-600 text-white px-6 py-2 rounded">
Submit Complaint
</button>

</form>

</div>

</div>

)

}