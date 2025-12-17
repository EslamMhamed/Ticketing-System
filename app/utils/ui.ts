export const getPriorityClass = (priority: string)=>{
  switch(priority){
    case "high":
      return "text-red-600 font-bold"
    case "medium": 
      return "text-yellow-600 font-bold"
    case "low": 
      return "text-green-600 font-bold"
  }
}