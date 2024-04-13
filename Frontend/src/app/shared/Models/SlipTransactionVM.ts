import { Group } from "./Group"
import { Users } from "./Users"

export interface SlipResponse{
    err: boolean;
    errMessage: string;
    data: SlipTransactionWithGroup
}

export interface SlipTransactionWithGroup{
    group: Group
    transaction: SlipTransactionVM[]
}

export interface SlipTransactionVM{
    _id: string
    name: string
    amount: number
    type: string
    addedBy_id: Users
    group_id: Group
    paidUser_id: Users
    payment_date: Date
    split_between: Users[]
    updated_on: Date
}
