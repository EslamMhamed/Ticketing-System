import { getTicketById } from "@/app/actions/ticket.actions"
import { logEvent } from "@/app/utils/sentry"
import { getPriorityClass } from "@/app/utils/ui"
import Link from "next/link"
import { notFound } from "next/navigation"


async function TicketDetailsPage({params}:{params: Promise<{id: string}>}) {

    const {id} =await params
    const ticket = await getTicketById(id)
    
    if(!ticket){
        notFound()
    }

    logEvent("Viewing ticket details", "ticket", {ticketId: ticket.id}, "info")

  return (
    <div className="min-h-screen bg-blue-50 p-8 ">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow border border-gray-200 space-y-6 p-8">
            <h1 className="text-3xl font-bold text-blue-600">
                {ticket.subject}
            </h1>
            <div className="text-gray-700">
                <h2 className="text-lg font-semibold mb-2 ">
                    Description
                </h2>
                <p>{ticket.description}</p>
            </div>
            <div className="text-gray-700">
                <h2 className="text-lg font-semibold mb-2">
                    Priority
                </h2>
                <p className={getPriorityClass(ticket.priority)}>
                    {ticket.priority}
                </p>
            </div>
            <div className="text-gray-700">
                <h2 className="text-lg font-semibold mb-2 ">
                    Created At
                </h2>
                <p>{new Date(ticket.createdAt).toDateString()}</p>
            </div>
            <Link href={"/tickets"} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" > Back to Tickets
            </Link>
        </div>
    </div>
  )
}

export default TicketDetailsPage