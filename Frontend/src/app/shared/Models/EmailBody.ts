export interface EmailResponse{
    err: string
    errMessage: string
    data: EmailBody
}

export interface EmailBody{
    user: string
    subject: string
    body: string
}