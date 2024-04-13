export interface GroupInvitationResponse{
    err: string
    errMessage: string
    data: GroupInvitation
}
export interface GroupInvitation{
    body : string
    email : string
    group_uid : string
    invite_uid : string
    invited_by : string
    subject : string
}