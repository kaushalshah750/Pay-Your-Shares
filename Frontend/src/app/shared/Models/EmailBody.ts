export interface EmailResponse{
    err: string
    errMessage: string
    data: EmailBody
}

export interface EmailBody{
    User: number
    Subject: string
    Body: string
}