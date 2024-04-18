import { Group } from "./Group"
import { Users } from "./Users"

export interface SlipResponse{
    err: boolean;
    errMessage: string;
    data: SlipTransactionWithGroup
}

export interface SlipTransactionWithGroup{
    Group: Group
    Transaction: SlipTransactionVM[]
}

export interface SlipTransactionVM{
    Slip_id: string
    Name: string
    Amount: number
    AddedBy_id: Users
    PaidBy_id: Users
    Split_between: Users[]
    Payment_date: Date
}
