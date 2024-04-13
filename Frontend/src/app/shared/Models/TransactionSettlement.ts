import { Group } from "./Group"
import { Users } from "./Users"

export interface TransactionSettlementResponse{
    err: boolean;
    errMessage: string;
    data: TransactionSettlementWithGroup
}

export interface TransactionSettlementWithGroup{
    group: Group
    transaction: TransactionSettlement[]
}

export interface TransactionSettlement{
    type: string
    action: string
    amount: number
    settleBy_User: Users
    settleTo_User: Users
    addedBy_id: Users
    group_id: Group
    payment_date: Date
    created_on: Date
    updated_on: Date
}