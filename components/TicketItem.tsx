import { Ticket } from "@/app/generated/prisma/client"
import { getPriorityClass } from "@/app/utils/ui"
import Link from "next/link"

type TicketItemProps = {
    ticket :Ticket
}

function TicketItem({ticket}: TicketItemProps) {
  const isClose = ticket.status === "Closed"
  return (
    <div
              key={ticket.id}
              className={`flex justify-between items-center bg-white rounded-lg shadow border border-gray-200 p-6
              ${isClose ? 'opacity-50 ': ''}`}
            >
              {/* Left Side */}
              <div>
                <h2 className="text-xl font-semibold text-blue-600">
                  {ticket.subject}
                </h2>
              </div>

              {/* Right Side */}
              <div className="text-right space-y-2">
                <div className="text-sm text-gray-500">
                  Priority:{" "}
                  <span className={getPriorityClass(ticket.priority)}>
                    {ticket.priority}
                  </span>
                </div>
                <Link
                  href={`/tickets/${ticket.id}`}
                  className={`inline-block mt-2  text-sm px-3 py-1 rounded-md  transition text-center ${isClose ? "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none" : "bg-blue-600 text-white hover:bg-blue-700"} `}
                >
                  View Ticket
                </Link>
              </div>
            </div>
  )
}

export default TicketItem