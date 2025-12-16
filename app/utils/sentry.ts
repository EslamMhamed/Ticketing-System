import * as Sentry from "@sentry/nextjs"

type LogLevel = "info" | "fatal" | "warning" | "error"

export function logEvent(
message :string,
category: string = "general",
data?: Record<string, any>,
level: LogLevel = "info",
error?: unknown
){
    Sentry.addBreadcrumb({
        category,
        message,
        data,
        level
    })

    if(error){
        Sentry.captureException(error, {extra: data})
    }else{
        Sentry.captureMessage(message, level )
    }
}