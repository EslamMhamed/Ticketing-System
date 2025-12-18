"use server";
import prisma from "../db/prisma";
import { revalidatePath } from "next/cache";
import { logEvent } from "../utils/sentry";
import { getCurrentUser } from "@/lib/current-user";
import { ResponseResult } from "./auth.actions";

export async function createTicket(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const user = await getCurrentUser()
    if(!user){
      logEvent("Unauthorized ticket cration attempt", "ticket", {}, "warning")
      return {success: false, message: "You must be logged in to create ticket"}
    }
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;

    if (!subject || !description || !priority) {
      logEvent(
        "Validation Error: Missing ticket fields",
        "ticket",
        { subject, description, priority },
        "warning"
      );
      return { success: false, message: "All fields are required" };
    }

    //create ticket
    const ticket = await prisma.ticket.create({
      data: { subject, description, priority, user: {connect : {id: user.id}} },
    });

    logEvent(
      `Ticket was created successfully : ${ticket.id}`,
      "ticket",
      { ticketId: ticket.id },
      "info"
    );

    revalidatePath("/tickets");

    return { success: true, message: "Ticket create successfully" };
  } catch (error) {
    logEvent(
      "An error occurred while creating ticket",
      "ticket",
      { formData: Object.fromEntries(formData.entries()) },
      "error",
      error
    );
  }
  return {
    success: false,
    message: "An error occurred while creating the ticket",
  };
}


export async function getTickets() {
  try {
    const user = await getCurrentUser()
    if(!user){
      logEvent("Unauthorized to access to ticket list", "ticket", {}, "warning")
      return []
    }
    const tickets = await prisma.ticket.findMany({
      where: {userId: user.id},
    orderBy:{createdAt: "desc" }
  })

  logEvent("Fetched ticket list", "ticket", {count : tickets.length}, "info")
  return tickets

  } catch (error) {
    logEvent("Error fetching tickets", "ticket", {}, "error", error)
    return []
  }
}

export async function getTicketById(id:string) {
  try {
    const ticket = await prisma.ticket.findUnique({where:{
    id: Number(id)
  }})
  if(!ticket){
    logEvent("Ticket not found", "ticket" , {ticketId: id}, "warning")
  }
  return ticket
  } catch (error) {
    logEvent("Error fetching ticket details", "ticket", {ticketId: id}, "error",error)
    return null
  }
}

//Close ticket 
export async function closeTicket(prevState:ResponseResult, formData: FormData): Promise<ResponseResult> {
  const ticketId = Number(formData.get("ticketId"))
  if(!ticketId){
    logEvent("Missing ticket Id ", "ticket", {}, "warning")
    return {success: false, message:"Ticket ID is Required"}
  }

  const user = await getCurrentUser()
  if(!user){
    logEvent("Missing user Id ", "ticket", {}, "warning")

    return {success: false, message: "Unauthorized"}
  }

  const ticket = await prisma.ticket.findUnique({where: {id:ticketId}})
  if(!ticket || ticket.userId !== user.id){
    logEvent("Unauthorized ticket close attempt", "ticket", {ticketId, userId:user.id}, "warning")
    return {success: false, message: "You are not authorized to close this ticket"}
  }
  
  await prisma.ticket.update({where: {id: ticketId}, data:{status: "Closed"}})

  revalidatePath("/tickets")
  revalidatePath(`/tickets/${ticketId}`)

  return {success: true, message: "Ticket closed successfully"}

}