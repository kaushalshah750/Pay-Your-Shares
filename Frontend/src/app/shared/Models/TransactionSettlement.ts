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
    Action: string
    Amount: number
    SettleBy_id: Users
    SettleTo_id: Users
    AddedBy_id: Users
    Group_id: Group
    Payment_date: Date
}