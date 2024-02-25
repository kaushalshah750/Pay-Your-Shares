export interface SendGroupInvite{
    Email: string | null
    Invite_UId: string
    Group_UId: string
    Subject: string
    Body: string
    IsHTML: boolean
}