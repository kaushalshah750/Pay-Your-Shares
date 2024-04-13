import { Users } from "./Users"

export interface GroupSummaryResponse{
    err: boolean;
    errMessage: string;
    data: GroupSummary[]
}

export interface GroupSummary{
    user: Users
    balance: number
}
