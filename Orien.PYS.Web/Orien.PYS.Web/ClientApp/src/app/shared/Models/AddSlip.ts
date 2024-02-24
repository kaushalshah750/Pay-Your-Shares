export interface AddSlip {
    Name: string
    Amount: number
    PaidByUser_UId: number
    Group_UId: string
    TransactionDate: Date
    Users: number[]
}