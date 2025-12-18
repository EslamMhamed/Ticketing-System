import React from 'react'
import NewTicketForm from './ticket-form'
import { getCurrentUser } from '@/lib/current-user'
import { redirect } from 'next/navigation'

async function NewTicketsPage() {
  const user = await getCurrentUser()
  if(!user){
     redirect("/login")
  }
  return (
    <main className="min-h-[calc(100vh-120px)] bg-blue-50 flex items-center justify-center px-4">
      <NewTicketForm />
    </main>
  )
}

export default NewTicketsPage