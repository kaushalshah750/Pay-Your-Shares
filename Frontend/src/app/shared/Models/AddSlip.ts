export interface AddSlip {
    type: string
    name: string
    amount: number
    paidUser_id: string
    addedBy_id: string
    group_id: string
    split_between: string[]
    payment_date: Date
    created_on: Date
    updated_on: Date
}