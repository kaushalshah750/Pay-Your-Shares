import { Users } from "./Users"

export interface SlipTransactionVM{
    slip_Id: number 
    name: string 
    amount: number
    transactionDate: Date
    paid_By: Users
    users: Users[]
}

