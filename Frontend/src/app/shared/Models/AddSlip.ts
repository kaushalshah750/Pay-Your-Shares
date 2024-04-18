export interface AddSlip {
    Name: string
    Amount: number
    PaidBy_id: number
    AddedBy_id: number
    Group_id: number
    Split_between: string[]
    Payment_date: Date
}