export interface HttpResponse {
    data: GeneralResponse,
    status: number,
}

export  interface GeneralResponse {
    data?: any,
    event?: any,
    label?: any,
    meta?: any,
    message?: string,
    error?: string,
    redirect?: string,
    success?: boolean
    attendee_detail?:any
}