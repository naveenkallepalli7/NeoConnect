"use client"

import { useState } from "react"
import API from "../../services/api"
import { useRouter } from "next/navigation"

export default function Login(){

const router = useRouter()

const [form,setForm] = useState({
email:"",
password:""
})

const login = async(e:any)=>{

e.preventDefault()

try{

const res = await API.post("/auth/login",form)

const user = res.data.user
const token = res.data.token

// store login info
localStorage.setItem("token",token)
localStorage.setItem("user",JSON.stringify(user))

alert("Login successful")

// role based redirect
if(user.role === "staff"){
router.push("/complaint")
}
else if(user.role === "manager"){
router.push("/dashboard")
}
else if(user.role === "admin"){
router.push("/dashboard")
}
else{
router.push("/")
}

}catch(error){

console.error(error)

alert("Login failed")

}

}

return (

<div className="flex items-center justify-center h-screen bg-gray-100">

<form
onSubmit={login}
className="bg-white p-8 rounded-lg shadow-lg w-80 space-y-4"
>

<h1 className="text-xl font-bold text-center text-gray-800">
NeoConnect Login
</h1>

<input
type="email"
placeholder="Email"
className="border border-gray-300 p-2 w-full rounded text-black"
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<input
type="password"
placeholder="Password"
className="border border-gray-300 p-2 w-full rounded text-black"
onChange={(e)=>setForm({...form,password:e.target.value})}
/>

<button
className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded"
>
Login
</button>

</form>

</div>

)

}