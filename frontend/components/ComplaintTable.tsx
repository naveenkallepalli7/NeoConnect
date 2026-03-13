"use client"

import { useEffect, useState } from "react"
import API from "../services/api"

export default function ComplaintTable({ complaints, refresh }: any) {

const [role, setRole] = useState("")
const [managers, setManagers] = useState([])

useEffect(() => {

const user = JSON.parse(localStorage.getItem("user") || "{}")
setRole(user.role)

fetchManagers()

}, [])

const fetchManagers = async () => {

try{

const res = await API.get("/auth/managers")
setManagers(res.data)

}catch(error){
console.error("Error fetching managers:", error)
}

}

const assignManager = async (id: string, managerId: string) => {

if(!managerId) return

try{

await API.post("/complaints/assign", {
complaintId: id,
managerId: managerId
})

refresh()

}catch(error){
console.error("Assign error:", error)
}

}

const updateStatus = async (id: string, status: string) => {

if(status === "Status") return

try{

await API.post("/complaints/status", {
complaintId: id,
status,
notes: "Updated via dashboard"
})

refresh()

}catch(error){
console.error("Status update error:", error)
}

}

return (

<table className="w-full border">

<thead>

<tr className="bg-gray-200">
<th>ID</th>
<th>Category</th>
<th>Department</th>
<th>Status</th>
<th>File</th>
<th>Assign</th>
<th>Update Status</th>
</tr>

</thead>

<tbody>

{complaints.map((c: any) => (

<tr key={c._id} className="border">

<td>{c.trackingId}</td>
<td>{c.category}</td>
<td>{c.department}</td>
<td>{c.status}</td>

<td>
{c.file ? (
<a
href={`http://localhost:5000/uploads/${c.file}`}
target="_blank"
className="text-blue-600 underline"
>
View File
</a>
) : (
"No File"
)}
</td>

<td>

{role === "admin" && (

<select
className="border p-1"
onChange={(e) => assignManager(c._id, e.target.value)}
>

<option value="">Select Manager</option>

{managers.map((m: any) => (
<option key={m._id} value={m._id}>
{m.name}
</option>
))}

</select>

)}

</td>

<td>

{(role === "manager" || role === "admin") && (

<select
className="border p-1"
onChange={(e) => updateStatus(c._id, e.target.value)}
>

<option>Status</option>
<option>In Progress</option>
<option>Pending</option>
<option>Resolved</option>
<option>Escalated</option>

</select>

)}

</td>

</tr>

))}

</tbody>

</table>

)

}