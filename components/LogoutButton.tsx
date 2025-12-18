"use client"

import { logoutUser } from "@/app/actions/auth.actions"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

function LogoutButton() {
    const [state, formAction]= useActionState(logoutUser, {success: false, message: ""})
    const router = useRouter()

    useEffect(()=>{
        if(state.success){
            toast.success("Logout successful")
            router.push("/login")
        }else if(state.message){
            toast.error(state.message)
        }
    }, [state, router])
  return (
    <form action={formAction}>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </form>
  )
}

export default LogoutButton