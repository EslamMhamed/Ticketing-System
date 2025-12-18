"use client"
import { closeTicket } from "@/app/actions/ticket.actions"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

type CloseTicketProps = {
    ticketId: number,
    isClosed: boolean
}

function CloseTicketButton({ticketId, isClosed}: CloseTicketProps) {
    const [state, formAction] = useActionState(closeTicket, {success: false, message: ""})
    const router = useRouter()

    useEffect(()=>{
        if(state.success){
            toast.success(state.message)
            router.push("/tickets")
        }else if(state.message && !state.success){
            toast.error(state.message)
        }
    },[state, router])

    if(isClosed) return null

  return (
    <form action={formAction}>
        <input type="hidden" name="ticketId" value={ticketId} />
        <button type="submit" className="bg-red-500 text-white px-3 py-3 w-full rounded-md hover:bg-red-600 transition cursor-pointer">
            Close Ticket 
        </button>
    </form>
  )
}

export default CloseTicketButton